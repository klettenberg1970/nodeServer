// Diese Funktion ist ein "Wrapper"
const asyncHandler = (fn) => (req, res, next) => {
    // Wir führen deine Funktion aus und hängen ein .catch() dran
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;