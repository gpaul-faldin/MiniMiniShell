const cd = (args, setResult) => {
  window.chdir(args[0]);
  setResult("");
};

const pwd = (args, setResult) => {
  let tmp = window.elec_pwd();
  if (setResult != null) setResult(tmp);
  return tmp;
};

const ls = (args, setResult) => {
  let option = args[0];
  let path_dot = pwd(null, null);
  window.elec_ls(path_dot, (err, data) => {
    let re = "";
    if (option === "-a") re = data.join("      ");
    else {
      data = data.filter((value) => !value.startsWith("."));
    }
    re = data.join("      ");
    setResult(re);
  });
};

const touch = async (args, setResult) => {
  let name = args[0];
  let content = args[1] === undefined ? "" : args[1];
  let path_dot = await pwd(null, null);
  window.elec_touch(path_dot + "/" + name, content);
  setResult("");
};

const echo = async (args, setResult) => {
  let str = "";
  let redirect = {
    active: false,
    path: "",
  };
  for (let x = 0; x < args.length; x++) {
    if (redirect.active === true) {
      redirect.path = args[x];
      break;
    }
    if (args[x] === ">") {
      redirect.active = true;
    } else {
      if (Number(args[x]) === 0) str = str + " ";
      else str = str + " " + args[x];
    }
  }
  if (!redirect.active) setResult(str.trimStart());
  else await touch([redirect.path, str.trimStart()], setResult);
};

const cat = async (args, setResult) => {
  let str = "";
  let redirect = {
    active: false,
    path: "",
  };
  for (let x = 0; x < args.length; x++) {
    if (redirect.active === true) {
      redirect.path = args[x];
      break;
    }
    if (args[x] === ">") {
      redirect.active = true;
    } else {
      str = str + window.elec_cat(args[x], "utf8");
    }
  }
  if (!redirect.active) setResult(str.trimStart());
  else await touch([redirect.path, str.trimStart()], setResult);
};

const rm = async (args, setResult) => {
  let path_dot = await pwd(null, null);

  for (let x = 0; x < args.length; x++) {
    let path = args[x][0] === "/" ? args[x] : path_dot + "/" + args[x];
    await window.elec_rm(path);
  }
  setResult("");
};

module.exports = {
  cd,
  pwd,
  ls,
  touch,
  echo,
  cat,
  rm,
};
