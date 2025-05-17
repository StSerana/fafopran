import GameTask from "./tic-tac-toe/GameTask.tsx";
import OkakTask from "./okak/OkakTask.tsx";
import AdminTask from "./admin/AdminTask.tsx";

const Components = new Map();

Components.set('game', <GameTask/>);
Components.set('image', <OkakTask/>);
Components.set('admin', <AdminTask/>);

export default Components