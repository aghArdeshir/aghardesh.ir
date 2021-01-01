class JobSkillCustomElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'job-skill');

    this.attachTechnologyName();
    this.attatchLink();
    this.attachLevel();

    const style = document.createElement('style');
    style.textContent = `
    .skill-count {
        margin-left: 100px;
        letter-spacing: 5px
        display: inline-block;
    }

    .link-to-skill {
        width: 150px;
        display:inline-block;
        white-space: nowrap;
        text-align: center;
    }

    .tech-name {
        min-width: 150px;
        display: inline-block
    }

    .job-skill {
        margin-top: 10px
    }
    `;

    this.shadowRoot.append(style, this.wrapper);
  }

  attachTechnologyName() {
    const span = document.createElement('span');
    span.setAttribute('class', 'tech-name');
    span.textContent = this.textContent;
    this.wrapper.appendChild(span);
  }

  attatchLink() {
    if (this.getAttribute('skill-link')) {
      const link = document.createElement('a');
      link.setAttribute('href', this.getAttribute('skill-link'));
      link.setAttribute('rel', 'noopener');
      link.setAttribute('target', '_blank');
      link.setAttribute('class', 'link-to-skill');

      const small = document.createElement('small');
      small.textContent = '(Things I can understand🔗)';
      link.appendChild(small);

      this.wrapper.appendChild(link);
    } else {
      const small = document.createElement('small');
      small.setAttribute('class', 'link-to-skill');

      this.wrapper.appendChild(small);
    }
  }

  attachLevel() {
    const levels = ['basic', 'intermediate', 'advanced', 'expert'];

    const level = this.getAttribute('level');
    if (!levels.includes(level)) {
      throw new Error(`level can only be of one of ${levels.join(', ')}`);
    }

    const span = document.createElement('span');
    span.setAttribute('class', 'skill-count');
    span.textContent = new Array((levels.indexOf(level) + 1) * 2)
      .fill('*')
      .join('');
    this.wrapper.appendChild(span);
  }
}

customElements.define('job-skill', JobSkillCustomElement);
