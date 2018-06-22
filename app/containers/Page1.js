import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import { Button } from 'antd-mobile'

class Page1 extends Component {

  state = {
    imageShow: false,
    image: null
  }

  handleClick = () => {
    console.log('222')
    html2canvas(document.querySelector('#tu')).then(canvas => {
      const image = canvas.toDataURL("image/png")
      this.setState({
        image,
        imageShow: true
      })
    })
  }

  render() {
    const { image, imageShow } = this.state
    console.log('121212asdas')


    return (
      <div>
        {
          !imageShow ?
            <div id="tu">
              <div className="box"></div>
              <div className="height"></div>
              <Button type="primary" onClick={this.handleClick}>sfsd</Button>
            </div>
            :
            <div id="image">
              <img width="100%" src={image} alt="" />
            </div>
        }

      </div>
    )
  }
}

export default Page1
