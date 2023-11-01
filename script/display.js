const methods = [
  "IGISTDM",
  "Gatys et al.",
  "Ghiasi et al.",
  "Huang and Belongie",
];
const method_tooltips = [
  "Our method",
  "A neural algorithm of artistic style",
  "Exploring the structure of a real-time, arbitrary neural artistic stylization network",
  "Arbitrary style transfer in real-time with adaptive instance normalization",
];
const method_folder = ["IGISTDM", "NS", "RAASN", "AdaIN"];
const image_type = ".png";
const not_found_image = "images/image-not-found.png";
const content_amount = 20;
const style_amount = 100;
const row_of_images = 5;
// image base index
let content_base = 0;
let style_base = 0;

function generate_label_row() {
  let method_text = "";
  for (let i = 0; i < methods.length; i++) {
    method_text += `
        <div class="col-2  text-center">${create_tooltip(
          methods[i],
          method_tooltips[i]
        )}</div>`;
  }
  let label_row_html = `
    <div class="row">
      <div class="col-2 text-center">Content</div>
      <div class="col-2 text-center">Style</div>
      ${method_text}
    </div>`;
  return label_row_html;
}

function generate_image_row(
  content_image_index,
  style_index,
  style_image_index
) {
  // content
  let content_image_name = `${content}_${content_image_index}${image_type}`;
  // style
  let style_name = style[style_index];
  let style_image_name = `${style_name}_${style_image_index}${image_type}`;
  // style transfer result
  let stylized_result = "";
  for (let i = 0; i < methods.length; i++) {
    const image_folder_path = `results/${method_folder[i]}/${content}-${style_name}`;
    const image_name = `${content}_${content_image_index}-${style_name}_${style_image_index}${image_type}`;
    stylized_result += `
      <div class="col-2">
        <img src="${image_folder_path}/${image_name}" onerror="this.src='${not_found_image}';">
      </div>`;
  }
  const experiment_repo = `https://github.com/IGISTDM/experiment/raw/master/images/`;
  let image_row = `
    <div class="row mb-1">
        <div class="col-2 container">
            <img src="${experiment_repo}/content/${content_image_name}">
        </div>
        <div class="col-2">
            <img src="${experiment_repo}/style/${style_name}/${style_image_name}">
        </div>
        ${stylized_result}
    </div>`;
  return image_row;
}

function display() {
  if (selected_style == NOT_CHOSEN) {
    alert("Please select style !!!");
  } else {
    let image_row = "";
    for (let i = 0; i < row_of_images; i++) {
      style_base = style_base < 0 ? style_base + style_amount : style_base;
      content_base =
        content_base < 0 ? content_base + content_amount : content_base;
      image_row += generate_image_row(
        (content_base + i) % content_amount,
        selected_style,
        (style_base + i) % style_amount
      );
    }
    document.getElementById("result").innerHTML =
      image_row + generate_label_row() + `<br><br>`;

    enable_tooltip();
  }
}
function content_previous_page() {
  content_base -= 1;
  display();
}

function content_next_page() {
  content_base += 1;
  display();
}

function style_previous_page() {
  style_base -= 1;
  display();
}

function style_next_page() {
  style_base += 1;
  display();
}

// add event listener for content/style pagination
document.addEventListener(
  "keypress",
  (event) => {
    var key_code = event.code;
    if (key_code == "KeyI") {
      style_next_page();
    } else if (key_code == "KeyK") {
      style_previous_page();
    } else if (key_code == "KeyE") {
      content_next_page();
    } else if (key_code == "KeyD") {
      content_previous_page();
    }
  },
  false
);
