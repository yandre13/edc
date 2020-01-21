import React, { useState, useEffect, useRef } from 'react'

export const Home = ()=>{

const [data, setData] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa placeat ipsam excepturi temporibus pariatur rem dolor nostrum omnis officiis. Incidunt saepe eius veniam delectus, itaque consequatur dolor iure? Hic, architecto.')

 const getSelection = (bold, color) =>{
 const selected = window.getSelection(),
  text = selected.toString()
 console.log(text)
 if (!text) {
 console.log('empty')
 }else{
  const newFont = toBoldOrColor(text, bold, color)
  selected.getRangeAt(0).deleteContents()
  selected.getRangeAt(0).insertNode(newFont)

  //deleting old parent
  const parent = selected.getRangeAt(0).commonAncestorContainer,
   grantParent = document.getElementById('editor'),
   children = [...grantParent.children]
  console.log(children)
  console.log('new', newFont)
  console.log('parent', parent)

   for (const key of children) {
    if (key.innerText) {
    console.log(key)
    }else{
    grantParent.removeChild(key)
    }
   }

   if (newFont.style.fontWeight === 'bold') {
    //Adding a bold font
    console.log('newBold', newFont)
    console.log('parent', parent)
    if (parent.style.fontWeight === 'bold') {
     const newText = document.createTextNode(text)
     console.log('parentttt', newText.parentElement)
     parent.replaceChild(newText, newFont)
    }
   }
   if (newFont.style.color === color) {
     //Adding a color font
     console.log('newColor', newFont)
     console.log('parent', parent)
     if (parent.style.color === color) {
      const newText = document.createTextNode(text)
      console.log('parentttt', newText.parentElement)
      parent.replaceChild(newText, newFont)
     }
    }

    //OLD STYLES
    if (parent.nodeName === 'FONT') {
     if (parent.style.fontWeight === 'bold') {
      //Adding old styles
      const oldStyleWeight = parent.style.fontWeight
      newFont.style.fontWeight = oldStyleWeight
      const beforeThisParent = parent.parentElement

      if (beforeThisParent) {
       if (parent.innerText === newFont.innerText) {
        beforeThisParent.replaceChild(newFont, parent)
       }
     }
    }
    if (parent.style.color) {
     //Adding old styles
     const oldStyleColor = parent.style.color
     newFont.style.color = oldStyleColor
     const beforeThisParent = parent.parentElement
     if (beforeThisParent) {
     console.log('befireThis', beforeThisParent)
      if (parent.innerText === newFont.innerText) {
      beforeThisParent.replaceChild(newFont, parent)
      }
     }
    }
   }

   selected.removeAllRanges()
  }
 },
 toBoldOrColor = (text, bold, color)=>{
  console.log(text)
  if (text) {
   if (color) {
   const nodeForColor = document.createElement('font')
   nodeForColor.style.color = color
   nodeForColor.append(text)
   return nodeForColor
   }
   if (bold) {
   const nodeForBold = document.createElement('font')
   nodeForBold.style.fontWeight = 'bold'
   nodeForBold.append(text)
   return nodeForBold
   }
  }
 }

return(
 <>
  <h2>Editor</h2>
  <div id='editor' contentEditable>{data}</div>
  <br/>
  <button onClick={()=>{ getSelection(null, 'skyblue') }}>to Color</button>
  <br/>
  <button
  onClick={()=>getSelection(true)}>to Bold</button>
 </>
 )
}