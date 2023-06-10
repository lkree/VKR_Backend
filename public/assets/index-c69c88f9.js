import { x as createAppAsyncThunk, y as logout$1, a as useActions, r as reactExports } from "./index-c56b4bbb.js";
const computeActionName = (actionName) => `logout/${actionName}`;
const logout = createAppAsyncThunk(
  computeActionName("logout"),
  () => logout$1().then(() => location.reload())
);
const actions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  logout
}, Symbol.toStringTag, { value: "Module" }));
const Layout = () => {
  const { logout: logout2 } = useActions(actions);
  reactExports.useLayoutEffect(() => {
    void logout2();
  }, []);
  return null;
};
export {
  Layout as Logout
};
//# sourceMappingURL=index-c69c88f9.js.map
