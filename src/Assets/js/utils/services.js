let domain = `http://localhost:3300`;

const get_request = async (path) => {
  console.log(path);
  if (path && path.startsWith("/")) path = path.slice(1);
  try {
    let ftch = await fetch(`${domain}/${path}`);
    let res;
    try {
      res = await ftch.json();
    } catch (e) {
      return { _$not_sent: true };
    }

    return res && res.data;
  } catch (e) {
    console.log(e, domain);
    return path;
  }
};

const post_request = async (path, data) => {
  console.log(path);
  if (path && path.startsWith("/")) path = path.slice(1);
  try {
    let ftch = await fetch(`${domain}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data && JSON.stringify(data),
    });

    let res;
    try {
      res = await ftch.json();
    } catch (e) {
      return { _$not_sent: true };
    }

    return res && res.data;
  } catch (e) {
    console.log(e, domain);
    return path, data;
  }
};

export { post_request, get_request, domain };
