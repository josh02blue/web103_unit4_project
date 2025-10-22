import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { calculateTotalPrice, formatPrice, OPTION_PRICES, BASE_PRICE } from '../utilities/priceCalculator'
import { validateSelections, getOptionImages } from '../utilities/validation'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    const [selections, setSelections] = useState({
        name: '',
        exterior: '',
        wheels: '',
        roof: '',
        interior: ''
    })
    const [totalPrice, setTotalPrice] = useState(BASE_PRICE)
    const [errors, setErrors] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentImage, setCurrentImage] = useState('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop')

    const optionImages = getOptionImages()

    useEffect(() => {
        const newPrice = calculateTotalPrice(selections)
        setTotalPrice(newPrice)
        
        // Update visual based on exterior selection
        if (selections.exterior && optionImages.exterior[selections.exterior]) {
            setCurrentImage(optionImages.exterior[selections.exterior])
        }
    }, [selections.exterior, selections.wheels, selections.roof, selections.interior])

    const handleInputChange = (field, value) => {
        setSelections(prev => ({
            ...prev,
            [field]: value
        }))
        setErrors([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const validation = validateSelections(selections)
        if (!validation.isValid) {
            setErrors(validation.errors)
            return
        }

        setIsSubmitting(true)
        
        try {
            const carData = {
                name: selections.name,
                price: totalPrice.toString(),
                exterior: selections.exterior,
                exteriorImage: optionImages.exterior[selections.exterior],
                wheels: selections.wheels,
                wheelsImage: optionImages.wheels[selections.wheels],
                roof: selections.roof,
                roofImage: optionImages.roof[selections.roof],
                interior: selections.interior,
                interiorImage: optionImages.interior[selections.interior]
            }

            await createCar(carData)
            navigate('/customcars')
        } catch (error) {
            console.error('Error creating car:', error)
            setErrors(['Failed to create car. Please try again.'])
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container">
            <h1>Customize Your Car</h1>
            
            <div className="grid">
                <div className="car-customization">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Car Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={selections.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter a name for your car"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Exterior Color:</label>
                            <div className="options-grid">
                                {Object.keys(OPTION_PRICES.exterior).map(option => (
                                    <label key={option} className="option-card">
                                        <input
                                            type="radio"
                                            name="exterior"
                                            value={option}
                                            checked={selections.exterior === option}
                                            onChange={(e) => handleInputChange('exterior', e.target.value)}
                                        />
                                        <div className="option-content">
                                            <div className="option-name">{option}</div>
                                            <div className="option-price">
                                                {formatPrice(OPTION_PRICES.exterior[option])}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Wheels:</label>
                            <div className="options-grid">
                                {Object.keys(OPTION_PRICES.wheels).map(option => (
                                    <label key={option} className="option-card">
                                        <input
                                            type="radio"
                                            name="wheels"
                                            value={option}
                                            checked={selections.wheels === option}
                                            onChange={(e) => handleInputChange('wheels', e.target.value)}
                                        />
                                        <div className="option-content">
                                            <div className="option-name">{option}</div>
                                            <div className="option-price">
                                                {formatPrice(OPTION_PRICES.wheels[option])}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Roof:</label>
                            <div className="options-grid">
                                {Object.keys(OPTION_PRICES.roof).map(option => (
                                    <label key={option} className="option-card">
                                        <input
                                            type="radio"
                                            name="roof"
                                            value={option}
                                            checked={selections.roof === option}
                                            onChange={(e) => handleInputChange('roof', e.target.value)}
                                        />
                                        <div className="option-content">
                                            <div className="option-name">{option}</div>
                                            <div className="option-price">
                                                {formatPrice(OPTION_PRICES.roof[option])}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Interior:</label>
                            <div className="options-grid">
                                {Object.keys(OPTION_PRICES.interior).map(option => (
                                    <label key={option} className="option-card">
                                        <input
                                            type="radio"
                                            name="interior"
                                            value={option}
                                            checked={selections.interior === option}
                                            onChange={(e) => handleInputChange('interior', e.target.value)}
                                        />
                                        <div className="option-content">
                                            <div className="option-name">{option}</div>
                                            <div className="option-price">
                                                {formatPrice(OPTION_PRICES.interior[option])}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {errors.length > 0 && (
                            <div className="error-messages">
                                {errors.map((error, index) => (
                                    <div key={index} className="error-message">{error}</div>
                                ))}
                            </div>
                        )}

                        <div className="total-price">
                            <h3>Total Price: {formatPrice(totalPrice)}</h3>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Custom Car'}
                        </button>
                    </form>
                </div>

                <div className="car-preview">
                    <h3>Preview</h3>
                    <div className="car-image-container">
                        <img 
                            src={currentImage} 
                            alt="Car preview" 
                            className="car-preview-image"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
                            }}
                        />
                    </div>
                    <div className="preview-details">
                        <p><strong>Name:</strong> {selections.name || 'Unnamed Car'}</p>
                        <p><strong>Exterior:</strong> {selections.exterior || 'Not selected'}</p>
                        <p><strong>Wheels:</strong> {selections.wheels || 'Not selected'}</p>
                        <p><strong>Roof:</strong> {selections.roof || 'Not selected'}</p>
                        <p><strong>Interior:</strong> {selections.interior || 'Not selected'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCar