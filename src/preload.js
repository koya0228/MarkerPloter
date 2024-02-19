window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if(element) {
            element.textContent = text;
        }
    };

    for(const dependency of ["chorme", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
})