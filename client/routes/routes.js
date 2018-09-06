import SongCreate from "../components/SongCreate";
import SongListContainer from "../container/SongListContainer/SongListContainer";
import SongDetails from "../components/SongDetails";

const routes = [
    {
        path: '/',
        component: SongListContainer,
        exact: true
    },
    {
        path: '/song/create',
        component: SongCreate
    },
    {
        path: '/song/:id',
        component: SongDetails
    }
];

export default routes;