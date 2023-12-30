export default function BalloonBurst() {
  return <div>todo</div>;
}

// import { Button, Grid, Typography } from "@material-ui/core";
// import React from "react";
//
// interface Props {}
//
// interface State {}
//
// const CANVAS_SIZE = 600;
//
// export default class BalloonBurst extends React.Component<Props, State> {
//   public componentDidMount() {
//     const canvas = this.refs.gameCanvas as HTMLCanvasElement;
//   }
//
//   public render() {
//     return (
//       <Grid container spacing={2} direction="column" alignItems="center">
//         <Grid item>
//           <Typography>Conways Game of Life</Typography>
//         </Grid>
//         <Grid item>
//           <canvas
//             ref="gameCanvas"
//             width={CANVAS_SIZE}
//             height={CANVAS_SIZE}
//             style={{ border: "black solid 1px" }}
//           />
//         </Grid>
//         <Grid item>
//           <Grid container spacing={2} direction="row">
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => this.world.start()}
//               >
//                 Start
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => this.world.stop()}
//               >
//                 Stop
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => this.world.step()}
//               >
//                 Step
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => this.world.reset()}
//               >
//                 Restart
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     );
//   }
// }
