import { module as BaseModule } from "modujs";

export default class extends BaseModule {
    constructor(m) {
        super(m);

        this.image = this.$("image")[0];
        this.pagination = Array.from(this.$("pagination")[0].children);
    }
    
    init() {
        console.log("SingleSlider init");
        
        const baseImageSrc = this.image.src;
        this.pagination.forEach(pagination => {
            pagination.addEventListener("mouseover", () => {
                this.image.src = pagination.dataset.src;
            });
            pagination.addEventListener("mouseout", () => {
                this.image.src = baseImageSrc;
            });
        });
    }
}
