import React, { useState } from 'react'
import "./App.css"
import SlidebarItem from './components/slidebarItem/SlidebarItem'
import Slider from './components/slider/Slider'
import * as htmlToImage from "html-to-image"
import * as download from "downloadjs"


const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"

  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"

  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"

  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"

  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"

  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: "deg"

  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 10
    },
    unit: "px"

  },
]

const App = () => {

  const [image, setImage] = useState(null)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedOption = options[selectedIndex]


  const handleChange = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0])
    setImage(objectUrl)
  }


  const applyFilters = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return {
      filter: filters.join(" "),
      backgroundImage: `url(${image})`,
    }

  }

  const sliderChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedIndex) {
          return option
        }
        return { ...option, value: target.value }
      })
    })
  }

  const downloadImage = () => {
   htmlToImage.toPng(document.getElementById("image")).then((dataUrl) => {
    download(dataUrl, `${Date.now()}.png`)
   })  
  }


  return (
    <div className='container'>
      {
        image
          ?
          (
            <div className='main-image' id='image' style={applyFilters()} />
          )
          :
          (
            <div className='upload-image'>
              <h1>Photoshop Clone</h1>
              <input type='file' accept='image/*' onChange={handleChange} />

            </div>
          )
      }

      <div className='sidebar'>
        {
          options.map((option, index) => {
            return (
              <SlidebarItem
                key={index}
                name={option.name}
                active={index === selectedIndex}
                handleClick={() => setSelectedIndex(index)}
              />
            )
          })
        }
        <button onClick={downloadImage} className='download'>Download</button>
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={sliderChange}
      />
    </div>
  )
}

export default App