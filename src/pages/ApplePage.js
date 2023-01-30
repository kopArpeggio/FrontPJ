import React from 'react'
import PDFFile from '../components/PDFFile'
import { PDFDownloadLink } from '@react-pdf/renderer'

export default function ApplePage() {
  return (
    <div>
    
      <PDFDownloadLink document={<PDFFile/>} fileName="FORM">
        {({loading}) => (loading ? <button> Loading Document ...</button> : 'Download')} 
        
      </PDFDownloadLink>
      <PDFFile/>
    </div>
  )
}
