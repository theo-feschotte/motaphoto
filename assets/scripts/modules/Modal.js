import { module as BaseModule } from "modujs";

export default class extends BaseModule {
    constructor(m) {
        super(m);

        this.events = {
            click: {
              btn: "openModal",
              close: "closeModal",
            },
        };

        this.container = this.$("container")[0];
        this.delay = '200';
    }
    
    init() {
        console.log("Modal init");

        const customDuration = Array.from(this.container.classList).some(className => className.includes('duration-['));
        const tailwindDuration = Array.from(this.container.classList).some(className => className.includes('duration-'));
        if (customDuration) {
            this.delay = Array.from(this.container.classList).find(className => className.includes('duration-[')).split('duration-[')[1].split('s]')[0];
            this.delay = this.delay * 1000;
        }
        if (!customDuration && tailwindDuration) {
            this.delay = Array.from(this.container.classList).find(className => className.includes('duration-')).split('duration-')[1];
        }
    }

    openModal() {
        this.container.classList.remove("hidden");
        setTimeout(() => {
            this.container.classList.remove("opacity-0", "user-none", "pointer-events-none");
        }, 0);
    }

    closeModal() {
        this.container.classList.add("opacity-0", "user-none", "pointer-events-none");
        setTimeout(() => {
            this.container.classList.add("hidden");
        }, this.delay);
    }
}
