function keyPressHandler(key, callback) {
    /**
     * This function is called when a key is pressed.
     * @param {string} key - The key that was pressed.
     * @param {function} callback - The function to call when the key is pressed.
     */
    document.addEventListener('keydown', (event) => {
        if (event.key === key) {
            callback();
        }
    });
}
