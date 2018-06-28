import React, { Component } from 'react'

class Page2 extends Component {

  componentDidMount() {
    this.drawField() // 足球场
  }

  drawField = () => {
    const canvas = document.querySelector('#canvas')
    canvas.width = 400
    canvas.height = 270
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#008100'
    ctx.fillRect(0, 0, 400, 270)

    ctx.lineWidth = 2
    ctx.strokeStyle = 'white'

    // 边界
    ctx.beginPath()
    ctx.moveTo(15, 15)
    ctx.lineTo(385, 15)
    ctx.lineTo(385, 255)
    ctx.lineTo(15, 255)
    ctx.closePath()
    ctx.stroke()

    // 中线
    ctx.beginPath()
    ctx.moveTo(199, 15)
    ctx.lineTo(199, 255)
    ctx.stroke()

    // 中点
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.arc(199, 135, 3, 0, 2 * Math.PI)
    ctx.fill()

    // 中圈
    ctx.beginPath()
    ctx.arc(199, 135, 32, 0, 2 * Math.PI)
    ctx.stroke()

    // 角球圈
    ctx.beginPath()
    ctx.arc(15, 15, 10, 0, 0.5 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(385, 15, 10, 0.5 * Math.PI, Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(385, 255, 10, Math.PI, 1.5 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(15, 255, 10, 1.5 * Math.PI, 2 * Math.PI)
    ctx.stroke()

    // 小禁区
    ctx.beginPath()
    ctx.moveTo(15, 106)
    ctx.lineTo(35, 106)
    ctx.lineTo(35, 170)
    ctx.lineTo(15, 170)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(385, 106)
    ctx.lineTo(360, 106)
    ctx.lineTo(360, 170)
    ctx.lineTo(385, 170)
    ctx.stroke()

    // 大禁区
    ctx.beginPath()
    ctx.moveTo(15, 70)
    ctx.lineTo(70, 70)
    ctx.lineTo(70, 205)
    ctx.lineTo(15, 205)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(385, 70)
    ctx.lineTo(325, 70)
    ctx.lineTo(325, 205)
    ctx.lineTo(385, 205)
    ctx.stroke()

    // 点球
    ctx.beginPath()
    ctx.arc(53, 135, 3, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(345, 135, 3, 0, 2 * Math.PI)
    ctx.fill()

    // 禁区圈
    ctx.beginPath()
    ctx.arc(53, 135, 30, -0.3 * Math.PI, 0.3 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(342, 135, 30, 0.7 * Math.PI, 1.3 * Math.PI)
    ctx.stroke()

  }

  render() {
    return (
      <div className="field">
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}

export default Page2
