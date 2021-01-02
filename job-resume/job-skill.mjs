class JobSkillCustomElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "job-skill");

    this.attachTechnologyName();
    this.attatchLink();
    this.attachLevel();

    const style = document.createElement("style");
    style.textContent = `
    .skill-count {
        letter-spacing: 5px
        display: inline-block;
    }

    .link-to-skill {
        width: 150px;
        display:inline-block;
        white-space: nowrap;
        text-align: center;
        grid-row: 2;
        grid-column: 1;
        margin-bottom: 30px;
        margin-top: -10px;
    }

    .tech-name {
        min-width: 150px;
        display: inline-block;
        grid-row: 1;
        grid-column: 1;
    }

    .job-skill {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 120px auto;
        grid-template-rows: auto auto;
        gap: 10px;
    }

    @media (min-width: 500px) {
      .link-to-skill {
        margin-top: -40px;
        margin-left: 250px;
      }
    }

    @media (min-width: 600px) {
      .skill-count {        
        margin-left: 150px;
      }

      .job-skill {
        display: block;
      }

      .link-to-skill {
        margin-top: 0;
        margin-bottom: 0;
        margin-top: 0;
        margin-left: 0;
      }
    }

    .job-skill.dark-theme a {
      color: aqua;
    }
    `;

    this.shadowRoot.append(style, this.wrapper);

    this.themeChangeCallback = this.themeChangeCallback.bind(this);
  }

  themeChangeCallback(event) {
    this.wrapper.classList.toggle(
      "dark-theme",
      event.detail.colorScheme === "dark"
    );
  }

  connectedCallback() {
    document.addEventListener("colorschemechange", this.themeChangeCallback);
  }

  disconnectedCallback() {
    document.removeEventListener("colorschemechange", this.themeChangeCallback);
  }

  attachTechnologyName() {
    const span = document.createElement("span");
    span.setAttribute("class", "tech-name");
    span.textContent = this.textContent;
    this.wrapper.appendChild(span);
  }

  attatchLink() {
    if (this.getAttribute("skill-link")) {
      const link = document.createElement("a");
      link.setAttribute("href", this.getAttribute("skill-link"));
      link.setAttribute("rel", "noopener");
      link.setAttribute("target", "_blank");
      link.setAttribute("class", "link-to-skill");

      const small = document.createElement("small");
      small.textContent = "(Things I can understand🔗)";
      link.appendChild(small);

      this.wrapper.appendChild(link);
    } else {
      const small = document.createElement("small");
      small.setAttribute("class", "link-to-skill");

      this.wrapper.appendChild(small);
    }
  }

  attachLevel() {
    const levels = ["basic", "intermediate", "advanced", "expert"];

    const level = this.getAttribute("level");
    if (!levels.includes(level)) {
      throw new Error(`level can only be of one of ${levels.join(", ")}`);
    }

    const span = document.createElement("span");
    span.setAttribute("class", "skill-count");
    span.textContent = new Array((levels.indexOf(level) + 1) * 2)
      .fill("*")
      .join("");
    span.style.fontSize = levels.indexOf(level) * 2 + 16 + "px";
    span.style.opacity = (levels.indexOf(level) + 2) * 0.2;
    this.wrapper.appendChild(span);
  }
}

customElements.define("job-skill", JobSkillCustomElement);
