import { u as useSelector, s as selectEmailPassword, a as useActions, b as actions, j as jsxRuntimeExports, C as Container, F as Form, c as css, p as preventDefault, R as Row, d as Col, B as Button } from "./index-c56b4bbb.js";
import { l, f, h, e, g } from "./index-c56b4bbb.js";
const Login = () => {
  const { email, password } = useSelector(selectEmailPassword);
  const { submit, setEmail, setPassword } = useActions(actions);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { fluid: true, className: "justify-content-center align-items-center vh-100 vw-100 d-flex bg-dark text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: css.wrapper, onSubmit: preventDefault, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Form.Group, { as: Row, className: "mb-3 justify-content-center", controlId: "formPlaintextEmail", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { xs: "4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Label, { column: true, children: "Email" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Form.Control,
        {
          placeholder: "email@email.ru",
          type: "text",
          value: email,
          onChange: (e2) => setEmail(e2.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Form.Group, { as: Row, className: "mb-3 justify-content-center", controlId: "formPlaintextPassword", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { xs: "4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Label, { column: true, children: "Пароль" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Control, { type: "password", value: password, onChange: (e2) => setPassword(e2.target.value) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", type: "submit", onClick: submit, children: "Авторизоваться" }) }) })
  ] }) });
};
export {
  Login,
  actions,
  l as login,
  f as selectEmail,
  selectEmailPassword,
  h as selectIsLoading,
  e as selectLoginState,
  g as selectPassword
};
//# sourceMappingURL=index-768ef322.js.map
