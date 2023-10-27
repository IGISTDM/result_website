function enable_tooltip() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function create_tooltip(display_text, tooptip_text) {
  let tooltip_html = `<a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${tooptip_text}">
                        ${display_text}
                    </a>`;
  return tooltip_html;
}
