import React, { useEffect, useRef } from 'react'

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return

    const ctx = c.getContext('2d')
    if (!ctx) return

    let w = (c.width = window.innerWidth)
    let h = (c.height = window.innerHeight)
    let hw = w / 2
    let hh = h / 2

    const opts = {
      strings: ['HAPPY', 'BIRTHDAY!'],
      charSize: 30,
      charSpacing: 35,
      lineHeight: 40,
      cx: w / 2,
      cy: h / 2,
      fireworkPrevPoints: 10,
      fireworkBaseLineWidth: 5,
      fireworkAddedLineWidth: 8,
      fireworkSpawnTime: 200,
      fireworkBaseReachTime: 30,
      fireworkAddedReachTime: 30,
      fireworkCircleBaseSize: 20,
      fireworkCircleAddedSize: 10,
      fireworkCircleBaseTime: 30,
      fireworkCircleAddedTime: 30,
      fireworkCircleFadeBaseTime: 10,
      fireworkCircleFadeAddedTime: 5,
      fireworkBaseShards: 5,
      fireworkAddedShards: 5,
      fireworkShardPrevPoints: 3,
      fireworkShardBaseVel: 4,
      fireworkShardAddedVel: 2,
      fireworkShardBaseSize: 3,
      fireworkShardAddedSize: 3,
      gravity: 0.1,
      upFlow: -0.1,
      letterContemplatingWaitTime: 360,
      balloonSpawnTime: 20,
      balloonBaseInflateTime: 10,
      balloonAddedInflateTime: 10,
      balloonBaseSize: 20,
      balloonAddedSize: 20,
      balloonBaseVel: 0.4,
      balloonAddedVel: 0.4,
      balloonBaseRadian: -(Math.PI / 2 - 0.5),
      balloonAddedRadian: -1,
    }

    const calc = {
      totalWidth:
        opts.charSpacing *
        Math.max(opts.strings[0].length, opts.strings[1].length),
    }

    const Tau = Math.PI * 2
    const TauQuarter = Tau / 4
    // @ts-ignore
    const letters: any[] = []

    ctx.font = `${opts.charSize}px Verdana`
    function Letter(char: string, x: number, y: number) {
      // @ts-ignore
      this.char = char
      // @ts-ignore
      this.x = x
      // @ts-ignore
      this.y = y
      // @ts-ignore
      this.dx = -ctx.measureText(char).width / 2
      // @ts-ignore
      this.dy = +opts.charSize / 2
      // @ts-ignore
      this.fireworkDy = this.y - hh
      const hue = (x / calc.totalWidth) * 360
      // @ts-ignore
      this.color = `hsl(${hue},80%,50%)`
      // @ts-ignore
      this.lightAlphaColor = `hsla(${hue},80%,light%,alp)`
      // @ts-ignore
      this.lightColor = `hsl(${hue},80%,light%)`
      // @ts-ignore
      this.alphaColor = `hsla(${hue},80%,50%,alp)`
      // @ts-ignore
      this.reset()
    }

    Letter.prototype.reset = function () {
      this.phase = 'firework'
      this.tick = 0
      this.spawned = false
      this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0
      this.reachTime =
        (opts.fireworkBaseReachTime +
          opts.fireworkAddedReachTime * Math.random()) |
        0
      this.lineWidth =
        opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random()
      this.prevPoints = [[0, hh, 0]]
    }

    Letter.prototype.step = function () {
      if (this.phase === 'firework') {
        if (!this.spawned) {
          ++this.tick
          if (this.tick >= this.spawningTime) {
            this.tick = 0
            this.spawned = true
          }
        } else {
          ++this.tick
          const linearProportion = this.tick / this.reachTime
          const armonicProportion = Math.sin(linearProportion * TauQuarter)
          const x = linearProportion * this.x
          const y = hh + armonicProportion * this.fireworkDy
          if (this.prevPoints.length > opts.fireworkPrevPoints)
            this.prevPoints.shift()
          this.prevPoints.push([x, y, linearProportion * this.lineWidth])
          const lineWidthProportion = 1 / (this.prevPoints.length - 1)
          for (let i = 1; i < this.prevPoints.length; ++i) {
            const point = this.prevPoints[i]
            const point2 = this.prevPoints[i - 1]
            ctx.strokeStyle = this.alphaColor.replace(
              'alp',
              i / this.prevPoints.length,
            )
            ctx.lineWidth = point[2] * lineWidthProportion * i
            ctx.beginPath()
            ctx.moveTo(point[0], point[1])
            ctx.lineTo(point2[0], point2[1])
            ctx.stroke()
          }
          if (this.tick >= this.reachTime) {
            this.phase = 'contemplate'
            this.circleFinalSize =
              opts.fireworkCircleBaseSize +
              opts.fireworkCircleAddedSize * Math.random()
            this.circleCompleteTime =
              (opts.fireworkCircleBaseTime +
                opts.fireworkCircleAddedTime * Math.random()) |
              0
            this.circleCreating = true
            this.circleFading = false
            this.circleFadeTime =
              (opts.fireworkCircleFadeBaseTime +
                opts.fireworkCircleFadeAddedTime * Math.random()) |
              0
            this.tick = 0
            this.tick2 = 0
            this.shards = []
            const shardCount =
              (opts.fireworkBaseShards +
                opts.fireworkAddedShards * Math.random()) |
              0
            const angle = Tau / shardCount
            const cos = Math.cos(angle)
            const sin = Math.sin(angle)
            let x = 1
            let y = 0
            for (let i = 0; i < shardCount; ++i) {
              const x1 = x
              x = x * cos - y * sin
              y = y * cos + x1 * sin
              // @ts-ignore
              this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor))
            }
          }
        }
      } else if (this.phase === 'contemplate') {
        ++this.tick
        if (this.circleCreating) {
          ++this.tick2
          const proportion = this.tick2 / this.circleCompleteTime
          const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5
          ctx.beginPath()
          ctx.fillStyle = this.lightAlphaColor
            .replace('light', 50 + 50 * proportion)
            .replace('alp', proportion)
          ctx.beginPath()
          ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau)
          ctx.fill()
          if (this.tick2 > this.circleCompleteTime) {
            this.tick2 = 0
            this.circleCreating = false
            this.circleFading = true
          }
        } else if (this.circleFading) {
          ctx.fillStyle = this.lightColor.replace('light', 70)
          ctx.fillText(this.char, this.x + this.dx, this.y + this.dy)
          ++this.tick2
          const proportion = this.tick2 / this.circleFadeTime
          const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5
          ctx.beginPath()
          ctx.fillStyle = this.lightAlphaColor
            .replace('light', 100)
            .replace('alp', 1 - armonic)
          ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau)
          ctx.fill()
          if (this.tick2 >= this.circleFadeTime) this.circleFading = false
        } else {
          ctx.fillStyle = this.lightColor.replace('light', 70)
          ctx.fillText(this.char, this.x + this.dx, this.y + this.dy)
        }
        for (let i = 0; i < this.shards.length; ++i) {
          this.shards[i].step()
          if (!this.shards[i].alive) {
            this.shards.splice(i, 1)
            --i
          }
        }
        if (this.tick > opts.letterContemplatingWaitTime) {
          this.phase = 'balloon'
          this.tick = 0
          this.spawning = true
          this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0
          this.inflating = false
          this.inflateTime =
            (opts.balloonBaseInflateTime +
              opts.balloonAddedInflateTime * Math.random()) |
            0
          this.size =
            (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0
          const rad =
            opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random()
          const vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random()
          this.vx = Math.cos(rad) * vel
          this.vy = Math.sin(rad) * vel
        }
      } else if (this.phase === 'balloon') {
        ctx.strokeStyle = this.lightColor.replace('light', 80)
        if (this.spawning) {
          ++this.tick
          ctx.fillStyle = this.lightColor.replace('light', 70)
          ctx.fillText(this.char, this.x + this.dx, this.y + this.dy)
          if (this.tick >= this.spawnTime) {
            this.tick = 0
            this.spawning = false
            this.inflating = true
          }
        } else if (this.inflating) {
          ++this.tick
          const proportion = this.tick / this.inflateTime
          const x = (this.cx = this.x)
          const y = (this.cy = this.y - this.size * proportion)
          ctx.fillStyle = this.alphaColor.replace('alp', proportion)
          ctx.beginPath()
          generateBalloonPath(x, y, this.size * proportion)
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, this.y)
          ctx.stroke()
          ctx.fillStyle = this.lightColor.replace('light', 70)
          ctx.fillText(this.char, this.x + this.dx, this.y + this.dy)
          if (this.tick >= this.inflateTime) {
            this.tick = 0
            this.inflating = false
          }
        } else {
          this.cx += this.vx
          this.cy += this.vy += opts.upFlow
          ctx.fillStyle = this.color
          ctx.beginPath()
          generateBalloonPath(this.cx, this.cy, this.size)
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(this.cx, this.cy)
          ctx.lineTo(this.cx, this.cy + this.size)
          ctx.stroke()
          ctx.fillStyle = this.lightColor.replace('light', 70)
          ctx.fillText(
            this.char,
            this.cx + this.dx,
            this.cy + this.dy + this.size,
          )
          if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw)
            this.phase = 'done'
        }
      }
    }

    function Shard(
      this: {
        vx: number
        vy: number
        x: number
        y: number
        prevPoints: number[][]
        color: string
        alive: boolean
        size: number
      },
      x: number,
      y: number,
      vx: number,
      vy: number,
      color: string,
    ) {
      const vel =
        opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random()
      this.vx = vx * vel
      this.vy = vy * vel
      this.x = x
      this.y = y
      this.prevPoints = [[x, y]]
      this.color = color
      this.alive = true
      this.size =
        opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random()
    }

    Shard.prototype.step = function () {
      this.x += this.vx
      this.y += this.vy += opts.gravity
      if (this.prevPoints.length > opts.fireworkShardPrevPoints)
        this.prevPoints.shift()
      this.prevPoints.push([this.x, this.y])
      const lineWidthProportion = this.size / this.prevPoints.length
      for (let k = 0; k < this.prevPoints.length - 1; ++k) {
        const point = this.prevPoints[k]
        const point2 = this.prevPoints[k + 1]
        ctx.strokeStyle = this.color.replace('alp', k / this.prevPoints.length)
        ctx.lineWidth = k * lineWidthProportion
        ctx.beginPath()
        ctx.moveTo(point[0], point[1])
        ctx.lineTo(point2[0], point2[1])
        ctx.stroke()
      }
      if (this.prevPoints[0][1] > hh) this.alive = false
    }

    function generateBalloonPath(x: number, y: number, size: number) {
      // @ts-ignore
      ctx.moveTo(x, y)
      // @ts-ignore
      ctx.bezierCurveTo(
        x - size / 2,
        y - size / 2,
        x - size / 4,
        y - size,
        x,
        y - size,
      )
      // @ts-ignore
      ctx.bezierCurveTo(
        x + size / 4,
        y - size,
        x + size / 2,
        y - size / 2,
        x,
        y,
      )
    }

    function anim() {
      window.requestAnimationFrame(anim)
      // @ts-ignore
      ctx.fillStyle = '#eeeeee'
      // @ts-ignore
      ctx.fillRect(0, 0, w, h)
      // @ts-ignore
      ctx.translate(hw, hh)
      let done = true
      for (let l = 0; l < letters.length; ++l) {
        letters[l].step()
        if (letters[l].phase !== 'done') done = false
      }
      // @ts-ignore
      ctx.translate(-hw, -hh)
      if (done) for (let l = 0; l < letters.length; ++l) letters[l].reset()
    }

    for (let i = 0; i < opts.strings.length; ++i) {
      for (let j = 0; j < opts.strings[i].length; ++j) {
        letters.push(
          // @ts-ignore
          new Letter(
            opts.strings[i][j],
            j * opts.charSpacing +
              opts.charSpacing / 2 -
              (opts.strings[i].length * opts.charSize) / 2,
            i * opts.lineHeight +
              opts.lineHeight / 2 -
              (opts.strings.length * opts.lineHeight) / 2,
          ),
        )
      }
    }

    anim()

    const handleResize = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      hw = w / 2
      hh = h / 2
      ctx.font = `${opts.charSize}px Verdana`
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 300,
        zIndex: -1,
      }}
    />
  )
}

export default CanvasAnimation
