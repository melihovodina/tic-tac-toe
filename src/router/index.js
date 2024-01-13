import SignIn from '../components/Login/SignIn'
import Game from '../components/Game/LocalGame/Game'
import SignUp from '../components/Login/SignUp'
import Game2 from '../components/Game/GameWithBot/Game'
import ScoreBoard from '../components/ScoreBoard/ScoreBoard'
export const Links = [
    {path: '/sign-in', component: SignIn, exact: true},
    {path: '/sign-up', component: SignUp, exact: true},
    {path: '/bot-game', component: Game2, exact: true},
    {path: '/local-game', component: Game, exact: true},
    {path: '/scoreboard', component: ScoreBoard, exact: true}
]