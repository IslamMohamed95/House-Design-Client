import "./http";
import http from "./http";
import { format } from "date-fns";

export async function newAdmin(URL, newAdminValues, setNewAdminForm) {
  await http.client
    .post(
      URL,
      { ...newAdminValues },
      { headers: { Authorization: localStorage.getItem("token") } }
    )
    .then((res) => setNewAdminForm(!res.data.API));
}
export async function login(
  URL,
  formValues,
  setErr,
  setSubmit,
  setAction,
  navigate,
  setExit
) {
  await http.client
    .post(URL, {
      ...formValues,
    })
    .then(async (res) => {
      localStorage.setItem("token", res.data.token);
      setErr(!res.data.API);
      setAction(true);
      if (URL === "master/login") {
        navigate("/board");
      } else {
        localStorage.setItem("code", res.data.code);

        navigate("/dashboard");
      }

      setSubmit(false);
      setExit(false);
    })
    .catch((e) => {
      setSubmit(false);
      setErr("Wrong Email Or Password");
    });
}
export async function account(URL, setUser) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch(() => console.log("something went wrong !"));
}
export async function logout(URL, setExit) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(() => {
      setExit(true);
      localStorage.removeItem("token");
    })
    .catch((e) => console.log(e));
}
export async function users(URL, setClients, setLoaded, setAction) {
  http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setClients(res.data.users);
      setLoaded(true);
      setAction(false);
    })
    .catch((e) => console.log(e));
}
export async function user(URL, setClientData) {
  await http.client.get(URL).then((res) => {
    setClientData(res.data.user);
  });
}
export async function newUser(URL, client, setReg, setAction) {
  await http.client
    .post(
      URL,
      { ...client },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then(() => {
      setReg(false);
      setAction(true);
    });
}
export async function newVisitor(URL, formValues) {
  await http.client.post(URL, {
    ...formValues,
  });
}
export async function contracts(URL, setContracts) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setContracts(res.data.data);
    })
    .catch(() => console.log("something went wrong !"));
}
export async function addContract(URL, formValues, setAction) {
  await http.client
    .post(
      URL,
      { ...formValues },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => setAction(res.data.API));
}
export async function userContracts(URL, setContracts) {
  await http.client.get(URL).then((res) => {
    setContracts(res.data.data);
  });
}
export async function deleteContract(URL, setContracts, setDelete, setUser) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setContracts(res.data.contracts);
      setDelete(res.data.API);
      setUser(res.data.admin);
    });
}
export async function edit(URL, formValues, setContracts, setEdit, setAction) {
  await http.client
    .post(
      URL,
      { ...formValues },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      setContracts(res.data.contracts);
      setEdit(!res.data.API);
      setAction(true);
    });
}
export async function userContract(URL, formValues, setFormValues) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(async (res) => {
      let start_date = format(
        new Date(res.data.data.history.slice(-1)[0].start_date),
        "yyyy-MM-dd"
      );
      let end_date = format(
        new Date(res.data.data.history.slice(-1)[0].end_date),
        "yyyy-MM-dd"
      );
      let assign_date = format(
        new Date(res.data.data.history.slice(-1)[0].assign_date),
        "yyyy-MM-dd"
      );
      await setFormValues({
        ...formValues,
        location: res.data.data.location,
        stage: res.data.data.history.slice(-1)[0].stage,
        status: res.data.data.history.slice(-1)[0].status,
        assign_date: assign_date,
        start_date: start_date,
        end_date: end_date,
        total_cost: res.data.data.total_cost,
        sale_executive: res.data.data.sale_executive,
        note: res.data.data.history.slice(-1)[0].note,
      });
    });
}
export async function seenContract(URL, setAction) {
  await http.client
    .post(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(async (res) => {
      await setAction(true);
    });
}
export async function addComment(URL, formValues) {
  await http.client
    .post(
      URL,
      { ...formValues },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .catch((e) => console.log(e.message));
}
export async function pause(URL, formValues) {
  http.client
    .post(
      URL,
      { ...formValues },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .catch((e) => console.log(e.message));
}

export async function confirmPause(URL, setContracts) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => setContracts(res.data.data));
}
export async function resetPause(URL, setContracts) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setContracts(res.data.data);
    });
}
export async function cancelPause(URL, setContracts) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => setContracts(res.data.data));
}
export async function contractNotes(URL, setClientNotes) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setClientNotes(res.data.data);
    });
}
export async function newVariation(URL, formData) {
  await http.client
    .post(URL, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
export async function Variations(URL, setVariations, setAction) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(async (res) => {
      await setVariations(res.data.data);
      setAction(false);
    })
    .catch((err) => console.log(err));
}
export async function contractVariations(
  URL,
  setContractVariations,
  setAction
) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(async (res) => {
      await setContractVariations(res.data.contractVariations);
      setAction(false);
    })
    .catch((err) => console.log(err));
}
export async function download(URL) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      responseType: "blob",
    })
    .then((res) => {
      console.log(res.data);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); // or any other filename
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.log(err));
}
/*------------------------------- Sales --------------------------------*/
export async function all(URL, setSales, setAction, setLabels, setLabelsData) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setSales(res.data.data);
      setLabels(res.data.sales);
      setLabelsData(res.data.target);
      setAction(true);
    });
}
/**---------------------------- Last Update --------------------------- */
export async function deleteSalesman(URL, setSales, setDelete) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setSales(res.data.data);
      setDelete(res.data.API);
    });
}
/**--------------------------------------------------------------------**/
export async function newAdministrator(
  URL,
  formValues,
  setActiveAdmin,
  setAdd
) {
  await http.client
    .post(
      URL,
      {
        ...formValues,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      setActiveAdmin(false);
      setAdd(true);
    });
}
export async function newSalesman(URL, salesman, setAction) {
  await http.client
    .post(
      URL,
      { ...salesman },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then(() => setAction(true));
}
export async function visitors(URL, setVisitors) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(async (res) => await setVisitors(res.data.visitors));
}
export function setInputs(e, formValues, setFormValues) {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
}
export async function userLogoOut(URL) {
  await http.client
    .post(URL, "", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("code");
    });
}
export async function userProfile(URL, setCustomer) {
  await http.client
    .get(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setCustomer(res.data);
    });
}
export async function customerContracts(URL, setClientContracts) {
  await http.client.get(URL).then((res) => setClientContracts(res.data.data));
}
/*-------------------------- Reset Password ----------------------------*/
export async function passwordReset(
  URL,
  resetInfo,
  setReset,
  setConfirmMessage
) {
  await http.client
    .post(URL, { ...resetInfo })
    .then((res) => {
      setReset(res.data.API);
      setConfirmMessage(res.data.API);
    })
    .catch((e) => {
      setReset(e.response.data.API);
      setConfirmMessage(e.response.data.API);
    });
}
/*------------------------- Visitor Notes ------------------------------*/
export async function editVisitorStatus(URL, setVisitors, Notes) {
  await http.client
    .post(
      URL,
      { Notes },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      setVisitors(res.data.data);
    });
}
