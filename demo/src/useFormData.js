import { useState, useRef } from 'react'

export const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData)

  const initialFormData = useRef(initialData).current

  const updateFormData = (key, evt) => {
    switch (evt.target.type) {
      case 'text':
      case 'number':
        const textValue = evt.target.value || evt.target.placeholder
        setFormData(formData => ({ ...formData, [key]: textValue }))
        break
      case 'button':
      case 'checkbox':
        setFormData(formData => ({ ...formData, [key]: !formData[key] }))
        break
      default:
        setFormData(formData => ({ ...formData, [key]: evt.target.value }))
    }
  }

  return [formData, initialFormData, updateFormData]
}