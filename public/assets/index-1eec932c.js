import { u as useSelector, i as selectLeftoversList, a as useActions, k as actions, m as actions$1, r as reactExports, j as jsxRuntimeExports, n as BootstrapTable, E as EditableField, o as cn, q as css, t as useInitDownloadData, v as selectIsAdmin, U as UserLayout, C as Container } from "./index-c56b4bbb.js";
import { w } from "./index-c56b4bbb.js";
const Table = () => {
  const leftoversList = useSelector(selectLeftoversList);
  const { updateLeftover } = useActions(actions);
  const { addAlertsSettings } = useActions(actions$1);
  const onAcceptOrderedChange = reactExports.useCallback(
    (leftoverFilling, leftover) => updateLeftover({
      cityName: leftover.cityName,
      leftovers: leftover.leftovers.map((l) => l.nomenclature === leftoverFilling.nomenclature ? leftoverFilling : l)
    }).unwrap().then(() => addAlertsSettings({ variant: "success", children: "Изменения сохранены" })),
    []
  );
  if (!leftoversList)
    return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(BootstrapTable, { bordered: true, hover: true, size: "sm", className: "leftoverTable", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Город" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Товар" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Остаток" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "В пути" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Необходимо дозаказать" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leftoversList.map((leftoverFilling) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "align-middle", colSpan: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: leftoverFilling.cityName }) }) }),
      leftoverFilling.leftovers.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "align-middle", children: product.nomenclature }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "align-middle w-25", children: product.leftoverAtEnd }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "align-middle w-25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditableField,
          {
            value: product.orderedCount,
            onAccept: (payload) => onAcceptOrderedChange({ ...product, orderedCount: payload }, leftoverFilling)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: cn({ [css.haveToOrder]: product.haveToOrder !== 0 }, "align-middle"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: product.haveToOrder }) })
      ] }, product.vendorCode ?? i))
    ] }, leftoverFilling.cityName)) })
  ] });
};
const Layout = () => {
  const leftoversList = useSelector(selectLeftoversList);
  const { getLeftoversList } = useActions(actions);
  useInitDownloadData({ data: leftoversList, downloadFn: getLeftoversList });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Table, {});
};
function App() {
  const isAdmin = useSelector(selectIsAdmin);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    UserLayout,
    {
      showNavigation: isAdmin,
      body: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { fluid: true, className: "bg-light p-4 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, {}) })
    }
  );
}
export {
  App,
  w as appReducer
};
//# sourceMappingURL=index-1eec932c.js.map
