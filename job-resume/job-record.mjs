class JobRecordCustomElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "job-record");

    this.attachJobStartDate();
    this.attachTimeline();
    this.attachJobEndDate();
    this.attachJobDetalis();

    const style = document.createElement("style");
    style.textContent = `
    .job-record {
      border-top: 1px solid;
      padding: 20px 10px;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr auto;
      grid-gap: 20px;
    }
    
    :host {
      position: relative;
      display: block;
    }
    
    .job-record h5 {
        margin: 0
    }

    .job-start-date,
    .job-end-date {
        font-size: 10px;
        color: gray;
        grid-column: 1;
    }

    .job-start-date {
        grid-row: 3
    }

    .timeline {
        grid-row: 2;
        grid-column: 1;
        width: 1px;
        height: 100%;
        background-color: gray;
        margin-left: 10px;
    }

    .job-end-date {
        grid-row: 1;
    }

    .job-details {
        grid-column: 2;
        grid-row: 2;
    }

    .job-duration {
        color: red
    }
    `;

    this.shadowRoot.append(style, this.wrapper);
  }

  attachJobStartDate() {
    const jobStartDate = document.createElement("span");
    jobStartDate.setAttribute("class", "job-start-date");
    jobStartDate.textContent = this.getAttribute("start-date");
    this.wrapper.appendChild(jobStartDate);
  }

  attachTimeline() {
    const timeline = document.createElement("span");
    timeline.setAttribute("class", "timeline");
    this.wrapper.appendChild(timeline);
  }

  attachJobEndDate() {
    const jobEndDate = document.createElement("span");
    jobEndDate.setAttribute("class", "job-end-date");
    jobEndDate.textContent = this.getAttribute("end-date");
    this.wrapper.appendChild(jobEndDate);
  }

  attachJobDetalis() {
    const jobDetailsWrapper = document.createElement("div");
    jobDetailsWrapper.setAttribute("class", "job-details");

    const header = document.createElement("h5");
    header.textContent = this.getAttribute("job-title") + " @ ";
    const companyTitle = document.createElement(
      this.getAttribute("company-link") ? "a" : "span"
    );
    companyTitle.textContent = this.getAttribute("company-link")
      ? this.getAttribute("company-title") + "🔗"
      : this.getAttribute("company-title");
    if (this.getAttribute("company-link")) {
      companyTitle.setAttribute("href", this.getAttribute("company-link"));
      companyTitle.setAttribute("target", "_blank");
      companyTitle.setAttribute("rel", "noopener");
    }
    header.appendChild(companyTitle);

    jobDetailsWrapper.appendChild(header);

    const location = document.createElement("span");
    location.textContent = this.getAttribute("job-location");
    jobDetailsWrapper.appendChild(location);

    const jobDuration = document.createElement("div");
    jobDuration.setAttribute("class", "job-duration");
    jobDuration.textContent = this.getAttribute("duration");
    jobDetailsWrapper.appendChild(jobDuration);

    const jobDetails = document.createElement("p");
    jobDetails.textContent = this.textContent;
    jobDetailsWrapper.appendChild(jobDetails);

    this.wrapper.appendChild(jobDetailsWrapper);
  }
}

customElements.define("job-record", JobRecordCustomElement);
