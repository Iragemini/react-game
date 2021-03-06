
type BallObj = {
  x: number,
  y: number,
  dx: number,
  dy: number,
  rad: number,
  speed: number,
}

type PaddleProps = {
  height: number,
  width: number,
  x: number,
  y: number,
}

export default function paddleHit(ballObj: BallObj, paddleProps: PaddleProps): void {
  if (
    ballObj.x < paddleProps.x + paddleProps.width &&
    ballObj.x > paddleProps.x &&
    paddleProps.y < paddleProps.y + paddleProps.height &&
    ballObj.y + ballObj.rad > paddleProps.y - paddleProps.height / 2
  ) {
    let collidePoint = ballObj.x - (paddleProps.x + paddleProps.width / 2);
    collidePoint = collidePoint / (paddleProps.width / 2);
    const angle = (collidePoint * Math.PI) / 3;
    ballObj.dx = ballObj.speed * Math.sin(angle);
    ballObj.dy = -ballObj.speed * Math.cos(angle);
  }
}
