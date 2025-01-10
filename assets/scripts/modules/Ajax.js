import { module as BaseModule } from "modujs";

export default class extends BaseModule {
  constructor(m) {
    super(m);

    this.filter = new Object();

    this.events = {
      change: {
        input: "submitFilter",
      },
      click: {
        // prevPage: "prevPage",
        // nextPage: "nextPage",
        // firstPage: "firstPage",
        // lastPage: "lastPage",
        // goToPage: "goToPage",
        loadmore: "loadMore",
      },
    };
  }

  init() {
    console.log("Ajax init");
    
    this.filter["page"] = 1;
    this.ajax();
  }

  submitFilter() {
    this.$("input").forEach((input) => {
      if (!input.name) return;
      if (input.multiple) {
        const selectedOptions = [];
        for (const option of input.options) {
          if (option.selected) {
            selectedOptions.push(option.value);
          }
        }
        this.filter[input.name] = selectedOptions.join(" ");
      } else {
        this.filter[input.name] = input.value;
      }
    });
    this.filter["page"] = 1;
    this.ajax();
  }
  
//   prevPage() {
//     this.filter["page"] = parseInt(this.filter["page"]) - 1;
//     this.ajax();
//   }
//   nextPage() {
//     this.filter["page"] = parseInt(this.filter["page"]) + 1;
//     this.ajax();
//   }
//   firstPage() {
//     this.filter["page"] = 1;
//     this.ajax();
//   }
//   lastPage() {
//     this.filter["page"] = this.$("pages")[0].children.length;
//     this.ajax();
//   }
//   goToPage(e) {
//     this.filter["page"] = e.target.dataset.page;
//     this.ajax();
//   }
  loadMore() {
    this.filter["page"] = parseInt(this.filter["page"]) + 1;
    this.ajax();
  }

  ajax() {
    const request = new XMLHttpRequest();
    const data = new FormData();
    const ajaxurl =
      typeof ajax_params !== "undefined"
        ? ajax_params.ajaxurl
        : "/wp-admin/admin-ajax.php";

    data.append("action", this.getData("action"));
    data.append("filter", JSON.stringify(this.filter));

    request.open("POST", ajaxurl, true);
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const responseData = JSON.parse(request.responseText);
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = responseData.results;
        const items = tempDiv.querySelectorAll('ul > li');
        if (this.filter["page"] === 1) {
          this.$("results")[0].innerHTML = '';
        };
        items.forEach(item => this.$("results")[0].appendChild(item));
        tempDiv.remove();

        if (this.$("pagination")[0]) {
          this.$("pagination")[0].outerHTML = responseData.pagination;
        };
        this.$("results")[0].classList.remove("is-loading");
      }
    };

    this.$("results")[0].classList.add("is-loading");
    request.send(data);
  }
}