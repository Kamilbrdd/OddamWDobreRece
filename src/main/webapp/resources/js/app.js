document.addEventListener("DOMContentLoaded", function() {

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      console.log('FormSteps instance created'); // Dodaj tę linię
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      const institutionRadios = document.getElementsByName("institution");

      institutionRadios.forEach(radio => {
        radio.addEventListener("change", () => {
          if (radio.checked) {
            const institutionName = radio.parentElement.querySelector(".title").textContent;

            console.log("selected institution name:", institutionName);

            const summaryInstitutionElement = document.getElementById("summary-institution");
            summaryInstitutionElement.innerText = `Dla fundacji: ${institutionName}`;
          }
        });
      });

      // const selectedCategories = ["kaka","papa"];
      const categoriesCheckboxes = document.querySelectorAll('input[id^="category_"]');
      console.log("Total checkboxes found:", categoriesCheckboxes.length);

      categoriesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          console.log("Checkbox change event triggered for:", checkbox.value);

          const selectedCategories = Array.from(categoriesCheckboxes)
              .filter(checkbox => checkbox.checked)
              .map(checkbox => {
                const descriptionElement = checkbox.parentElement.querySelector(".description");
                return descriptionElement ? descriptionElement.textContent : "";
              });

          console.log("Selected categories:", selectedCategories);

          const summaryCategoriesElement = document.getElementById("summary-categories");
          summaryCategoriesElement.innerText = selectedCategories.join(", ");
        });
      });

      const quantityElement = document.getElementById("quantity");
      quantityElement.addEventListener("input", () => {
        const quantity = quantityElement.value;
        console.log("quantity:", quantity);

        const summaryQuantityElement = document.getElementById("summary-quantity");
        // const categoriesText = selectedCategories.join(", "); // Join categories with a comma
        summaryQuantityElement.innerText = `${quantity} worki zawierające-`;
      });

      const streetElement = document.getElementById("street");
      const cityElement = document.getElementById("city");
      const zipCodeElement = document.getElementById("zipCode");
      const pickUpDateElement = document.getElementById("pickUpDate");
      const pickUpTimeElement = document.getElementById("pickUpTime");
      const pickUpCommentElement = document.getElementById("pickUpComment");

      const summaryStreetElement = document.getElementById("summary-street");
      const summaryCityElement = document.getElementById("summary-city");
      const summaryZipCodeElement = document.getElementById("summary-zipCode");
      const summaryPickUpDateElement = document.getElementById("summary-pickUpDate");
      const summaryPickUpTimeElement = document.getElementById("summary-pickUpTime");
      const summaryPickUpCommentElement = document.getElementById("summary-pickUpComment");

      streetElement.addEventListener("input", () => {
        summaryStreetElement.innerText = streetElement.value;
      });

      cityElement.addEventListener("input", () => {
        summaryCityElement.innerText = cityElement.value;
      });

      zipCodeElement.addEventListener("input", () => {
        summaryZipCodeElement.innerText = zipCodeElement.value;
      });

      pickUpDateElement.addEventListener("input", () => {
        summaryPickUpDateElement.innerText = pickUpDateElement.value;
      });

      pickUpTimeElement.addEventListener("input", () => {
        summaryPickUpTimeElement.innerText = pickUpTimeElement.value;
      });

      pickUpCommentElement.addEventListener("input", () => {
        summaryPickUpCommentElement.innerText = pickUpCommentElement.value;
      });

    }
  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
