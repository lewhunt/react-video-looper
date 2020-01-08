import { useState, useRef } from 'react'

export const useFormData = (initialData, hasInitialDataForPlaceholder) => {
  const [formData, setFormData] = useState(initialData)

  const initialFormData = useRef(initialData).current

  const updateFormData = (key, evt) => {
    switch (evt.target.type) {
      case 'button':
      case 'checkbox':
        setFormData(formData => ({ ...formData, [key]: !formData[key] }))
        break
      case 'number':
      case 'text':
        const value = evt.target.value
        setFormData(formData => ({ ...formData, [key]: value }))    
        break
      default:
        setFormData(formData => ({ ...formData, [key]: evt.target.value }))
    }
  }

  return [formData, updateFormData, initialFormData, hasInitialDataForPlaceholder]
}