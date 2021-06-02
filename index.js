import screenFull from "screenfull";

export default class FullScreen {
    constructor(quill, options) {
        console.log(quill.container.parentElement);
        // Add button to all quill toolbar instances
        quill.container.parentElement
            .querySelectorAll(".ql-toolbar")
            .forEach(toolbarEl => {
                const buttonContainer = document.createElement("span");
                buttonContainer.setAttribute("class", "ql-formats");
                const button = document.createElement("button");
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.setAttribute('viewBox', "131 -131 18 18");
                const svgPath = document.createElementNS('http://www.w3.org/2000/svg','path');
                const svgFullscreenPath = "M 134.98789,-120.01211 H 133 V -115 h 5.01211 v -1.98789 h -3.02422 z M 133,-123.98789 h 1.98789 v -3.02422 h 2.99688 V -129 H 133 Z m 12.01211,7 h -3.02422 V -115 H 147 v -5.01211 h -1.98789 z M 141.98789,-129 v 1.98789 h 2.99688 v 2.99687 H 147 V -129 Z";
                const svgExitFullscreenPath = "m 133,-117.99961 h 2.99961 V -115 h 1.99883 v -5.00117 H 133 Z m 2.99961,-8.00078 H 133 v 1.99883 h 5.00117 V -129 h -1.99883 z M 141.99883,-115 h 1.99883 v -2.99961 H 147 v -1.99883 h -5.00117 z m 2.00156,-11.00039 V -129 h -1.99883 v 5.00117 H 147 v -1.99883 z";
                svgPath.setAttribute("d", svgFullscreenPath);
                svg.appendChild(svgPath);
                button.appendChild(svg);
                button.title = "Fullscreen mode";
                button.onclick = (e) => {
                    e.preventDefault();
                    screenFull.toggle(quill.container.parentElement);

                    setTimeout(()=> {
                        if (!window.screenTop && !window.screenY) {
                            svgPath.setAttribute("d", svgExitFullscreenPath);
                            button.title = "Exit fullscreen mode";
                        } else {
                            svgPath.setAttribute("d", svgFullscreenPath);
                            button.title = "Fullscreen mode";
                        }
                    }, 500);
                };
                buttonContainer.appendChild(button);
                toolbarEl.appendChild(buttonContainer);
            });
    }
}