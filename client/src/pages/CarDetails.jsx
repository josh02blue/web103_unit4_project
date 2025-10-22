import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/priceCalculator'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCar()
    }, [id])

    const fetchCar = async () => {
        try {
            setLoading(true)
            const carData = await getCar(id)
            setCar(carData)
        } catch (err) {
            console.error('Error fetching car:', err)
            setError('Car not found')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${car.name}"?`)) {
            try {
                await deleteCar(id)
                navigate('/customcars')
            } catch (err) {
                console.error('Error deleting car:', err)
                alert('Failed to delete car')
            }
        }
    }

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Loading car details...</div>
            </div>
        )
    }

    if (error || !car) {
        return (
            <div className="container">
                <div className="error">{error || 'Car not found'}</div>
                <Link to="/customcars" className="back-button">
                    Back to Cars
                </Link>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="car-details-header">
                <Link to="/customcars" className="back-button">
                    ← Back to Cars
                </Link>
                <h1>{car.name}</h1>
            </div>

            <div className="car-details-content">
                <div className="car-image-section">
                    <div className="main-car-image">
                        <img 
                            src={car.exteriorImage || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'} 
                            alt={car.name}
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
                            }}
                        />
                    </div>
                    
                    <div className="feature-images">
                        <div className="feature-image">
                            <h4>Wheels</h4>
                            <img 
                                src={car.wheelsImage || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'} 
                                alt={`${car.wheels} wheels`}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'
                                }}
                            />
                        </div>
                        
                        <div className="feature-image">
                            <h4>Roof</h4>
                            <img 
                                src={car.roofImage || 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop'} 
                                alt={`${car.roof} roof`}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop'
                                }}
                            />
                        </div>
                        
                        <div className="feature-image">
                            <h4>Interior</h4>
                            <img 
                                src={car.interiorImage || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop'} 
                                alt={`${car.interior} interior`}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="car-specifications">
                    <h2>Specifications</h2>
                    
                    <div className="specs-grid">
                        <div className="spec-item">
                            <h4>Exterior Color</h4>
                            <p>{car.exterior}</p>
                        </div>
                        
                        <div className="spec-item">
                            <h4>Wheels</h4>
                            <p>{car.wheels}</p>
                        </div>
                        
                        <div className="spec-item">
                            <h4>Roof Type</h4>
                            <p>{car.roof}</p>
                        </div>
                        
                        <div className="spec-item">
                            <h4>Interior</h4>
                            <p>{car.interior}</p>
                        </div>
                        
                        <div className="spec-item price-item">
                            <h4>Total Price</h4>
                            <p className="price">{formatPrice(parseFloat(car.price))}</p>
                        </div>
                    </div>

                    <div className="car-actions">
                        <Link 
                            to={`/edit/${car.id}`} 
                            className="action-button edit-button"
                        >
                            Edit Car
                        </Link>
                        <button 
                            onClick={handleDelete}
                            className="action-button delete-button"
                        >
                            Delete Car
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails