const NOT_CHOSEN = -1;
let selected_style = NOT_CHOSEN;
// BUTTON STATE
const BUTTON_NOT_SELECTED = 0;
const BUTTON_SELECTED = 1;
// BUTTON ID
const style_button_id_prefix = "btn_style_";
const display_button_id = "display";
// COLOR
const style_button_color = "primary";

function button_style_change(button_id, state, color) {
  let button = document.getElementById(button_id);
  const outline = `btn-outline-${color}`;
  const fill = `btn-${color}`;
  if (state == BUTTON_SELECTED) {
    button.classList.replace(outline, fill);
  } else {
    button.classList.replace(fill, outline);
  }
}

function change_style(button_id) {
  // change button display
  //                        previous button
  if (selected_style != NOT_CHOSEN) {
    let previous_button_id = style_button_id_prefix + selected_style;
    button_style_change(
      previous_button_id,
      BUTTON_NOT_SELECTED,
      style_button_color
    );
  }
  //                        current button
  button_style_change(button_id, BUTTON_SELECTED, style_button_color);
  // change style index
  const style_index = button_id.replace(style_button_id_prefix, "");
  selected_style = style_index;
}

function create_button(button_id, button_name, color) {
  let button_html = `
    <button type="button" class="btn btn-outline-${color} mb-1 ms-1" id=${button_id}>
      ${button_name}
    </button>`;
  return button_html;
}

function add_selector_buttons() {
  // title
  const left_space = "&nbsp;&nbsp;&nbsp;";
  let title = `${left_space}Style: `;

  // style button html
  let style_buttons = ``;
  let button_amount = style.length;
  let buttons_html = new Array(button_amount);
  for (let index = 0; index < button_amount; index++) {
    let new_button = create_button(
      `${style_button_id_prefix}${index}`,
      style[index],
      style_button_color
    );
    style_buttons += buttons_html[index] = new_button;
  }

  // display button html
  let display_button_html = create_button(
    display_button_id,
    "Display",
    "danger"
  );

  // hint space
  let hint_space = "";
  for(let i=0; i<20; i++){
    hint_space += `&nbsp;&nbsp;&nbsp;`;
  }

  // hint
  const hint = "press E/D to switch content, press I/K to switch style"

  let selector = document.getElementById("selector");
  selector.innerHTML = `
  <div>
    ${title}
    <div class="btn-group">
      ${style_buttons}${display_button_html}
    </div>
    ${hint_space}${hint}
  </div>`;

  // Event listener
  //          add event listener for style buttons
  for (let index = 0; index < button_amount; index++) {
    let button_id = `${style_button_id_prefix}${index}`;
    document.getElementById(button_id).addEventListener("click", function () {
      change_style(button_id);
    });
  }
  //          add event listener for display button
  document
    .getElementById(display_button_id)
    .addEventListener("click", function () {
      display();
    });
}

add_selector_buttons();
