const NOT_CHOSEN = -1;
let selected_style = NOT_CHOSEN;
// BUTTON STATE
const BUTTON_NOT_SELECTED = 0;
const BUTTON_SELECTED = 1;
const content = "scene";
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
  // add style button html
  let selector = document.getElementById("selector");
  selector.innerHTML = "Style: ";
  let button_amount = style.length;
  let buttons_html = new Array(button_amount);
  for (let index = 0; index < button_amount; index++) {
    let new_button = create_button(
      `${style_button_id_prefix}${index}`,
      style[index],
      style_button_color
    );
    selector.innerHTML += buttons_html[index] = new_button;
  }

  // add display button html
  let style_and_display_space = "";
  space_amount = 30;
  for (let i = 0; i < space_amount; i++) {
    style_and_display_space += "&nbsp;";
  }
  let display_button_html = create_button(
    display_button_id,
    "Display",
    "danger"
  );
  selector.innerHTML += `${style_and_display_space}${display_button_html}`;
  document
    .getElementById(display_button_id)
    .addEventListener("click", function () {
      display();
    });

  // Event listener
  //          add event listener for style buttons
  for (let index = 0; index < button_amount; index++) {
    let button_id = `${style_button_id_prefix}${index}`;
    document.getElementById(button_id).addEventListener("click", function () {
      change_style(button_id);
    });
  }
}

add_selector_buttons();
