var fs = require("fs");
const { emitKeypressEvents } = require("readline");
const dir = "./course_data/";
const dir2 = "./course_data_json/";

// fs.writeFileSync(`course_data.json`, "[");

function rewrite_txt() {
  fs.readdirSync(dir).forEach((file) => {
    const subject = JSON.parse(
      fs.readFileSync(`${dir}${file}`, {
        encoding: "utf8",
        flag: "r",
      })
    );

    let key_list = [];
    let keep_list = "[";
    Object.values(subject).forEach((course) => {
      ck = Object.keys(course)[0];
      if (!key_list.includes(ck)) {
        key_list.push(ck);
        keep = JSON.stringify(course) + ",";
        keep_list += keep;
      } else {
        console.log("repeated:", ck);
      }
    });

    keep_list = keep_list.slice(0, -1) + "]";

    if (keep_list.length > 2) {
      let new_file_name = file.slice(0, -3) + "json";
      fs.writeFileSync(`${dir2}${new_file_name}`, keep_list, function (err) {
        if (err) {
          return console.error(err);
        }
      });
    }
  });
}

// log file import
function logfile() {
  file_name = "course_data.js";
  let list_of_files = "const all_subjects = [";
  fs.writeFileSync(`${file_name}`, "");
  fs.readdirSync(dir2).forEach((file) => {
    let imp_name = file.slice(0, -5);
    list_of_files += `{${imp_name}}, `;
    let imp = `import ${imp_name} from "${dir2}${file}";`;
    fs.appendFileSync(`${file_name}`, imp, function (err) {
      if (err) {
        return console.error(err);
      }
    });
  });
  list_of_files += "]; export { all_subjects };";
  fs.appendFileSync(`${file_name}`, list_of_files);
}

function log_subjects() {
  file_name = "subject_names.js";
  export_name = "subject_names";

  let list_of_subjects = `const ${export_name} = [`;
  fs.writeFileSync(`${file_name}`, "");
  fs.readdirSync(dir2).forEach((file) => {
    let subj_name = file.slice(0, -5);
    list_of_subjects += `"${subj_name}", `;
  });
  list_of_subjects += `]; export { ${export_name} };`;
  fs.appendFileSync(`${file_name}`, list_of_subjects);
}

// rewrite_txt();
// logfile();
// log_subjects();
