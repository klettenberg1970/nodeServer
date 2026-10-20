import { drive } from '../../utils/GoogleDrive/googleDrive.js';
import { erstelleDatei } from './editObsidian.js';
import { toMarkdownBytes, formatFromExtension } from '@firecrawl/anydoc';
import asyncHandler from '../../middleware/asyncHandler.js';

// Standard-Ordnername in Google Drive unter Obsidian, falls kein Ordner übergeben wird
const DEFAULT_FOLDER_NAME = 'Unsortiert';

/**
 * Ermittelt die Folder-ID anhand des Namens innerhalb des Obsidian-Hauptordners
 * oder liefert den übergebenen Ordner (oder Fallback auf 'Unsortiert').
 */
async function getTargetFolderId(ordnerIdOrName) {
  if (ordnerIdOrName) {
    const folderRes = await drive.files.list({
      q: `name = '${ordnerIdOrName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });
    if (folderRes.data.files && folderRes.data.files.length > 0) {
      return folderRes.data.files[0].id;
    }
    return ordnerIdOrName;
  }

  // Fallback: Ordner 'Unsortiert' unter Obsidian suchen
  const obsidianParentId = process.env.OBSIDIAN_ID || process.env.OBSIDIAN_ORDNER_ID;
  const query = obsidianParentId
    ? `'${obsidianParentId}' in parents and name = '${DEFAULT_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    : `name = '${DEFAULT_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;

  const res = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
  });

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  return obsidianParentId;
}

export const speichernFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Keine Datei empfangen');
  }

  // 1. Name aus Frontend übernehmen (req.body.name oder req.body.dateiname), Fallback: originaler Dateiname
  let finalName = req.body.name || req.body.dateiname;
  if (!finalName || !finalName.trim()) {
    finalName = req.file.originalname;
  }

  // Dateiendung entfernen, falls vorhanden, da erstelleDatei automatisch .md anhängt
  finalName = finalName.trim().replace(/\.[^.]+$/, '');
  // Ungültige Zeichen bereinigen
  finalName = finalName.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');

  // 2. Inhalt in Markdown konvertieren oder Text direkt übernehmen
  let mdContent;
  const originalExt = (req.file.originalname.split('.').pop() || '').toLowerCase();
  const isPlainText = ['txt', 'md', 'markdown'].includes(originalExt) || req.file.mimetype.startsWith('text/');

  if (isPlainText) {
    mdContent = req.file.buffer.toString('utf8');
  } else {
    try {
      const explicitFormat = formatFromExtension(originalExt);
      mdContent = await toMarkdownBytes(req.file.buffer, explicitFormat || undefined);
    } catch (error) {
      if (error.code === 'encrypted') {
        res.status(422);
        throw new Error('Die Datei ist passwortgeschützt und kann nicht konvertiert werden.');
      }
      if (error.code === 'unsupported') {
        res.status(400);
        throw new Error('Das Dateiformat wird von anydoc nicht unterstützt.');
      }
      throw error;
    }
  }

  // 3. Sicherstellen, dass der Markdown-Inhalt ein UTF-8 String ist
  if (Buffer.isBuffer(mdContent) || mdContent instanceof Uint8Array) {
    mdContent = Buffer.from(mdContent).toString('utf8');
  }
  if (typeof mdContent !== 'string') {
    res.status(500);
    throw new Error('Konvertierung lieferte keinen gültigen Text.');
  }

  // 4. Zielordner in Google Drive bestimmen
  const targetFolderId = await getTargetFolderId(req.body.folderId || req.body.ordnerId || req.body.ordner);

  // 5. In Google Drive speichern via erstelleDatei
  const savedFile = await erstelleDatei(targetFolderId, finalName, mdContent);

  res.json({
    success: true,
    file: savedFile,
    name: `${finalName}.md`,
    folderId: targetFolderId,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
  });
});
