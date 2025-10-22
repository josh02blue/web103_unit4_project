import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/priceCalculator'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        try {
            setLoading(true)
            const carsData = await getAllCars()
            setCars(carsData)
        } catch (err) {
            console.error('Error fetching cars:', err)
            setError('Failed to load cars')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (carId, carName) => {
        if (window.confirm(`Are you sure you want to delete "${carName}"?`)) {
            try {
                await deleteCar(carId)
                setCars(cars.filter(car => car.id !== carId))
            } catch (err) {
                console.error('Error deleting car:', err)
                alert('Failed to delete car')
            }
        }
    }

    if (loading) {
        return (
            <div className="container">
                <h1>Custom Cars</h1>
                <div className="loading">Loading cars...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container">
                <h1>Custom Cars</h1>
                <div className="error">{error}</div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="header-section">
                <h1>Custom Cars</h1>
                <Link to="/" className="create-button">
                    Create New Car
                </Link>
            </div>

            {cars.length === 0 ? (
                <div className="empty-state">
                    <h3>No custom cars yet!</h3>
                    <p>Create your first custom car to get started.</p>
                    <Link to="/" className="create-button">
                        Create Your First Car
                    </Link>
                </div>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <div key={car.id} className="car-card">
                            <div className="car-image">
                                <img 
                                    src={car.exteriorImage || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'} 
                                    alt={car.name}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
                                    }}
                                />
                            </div>
                            
                            <div className="car-info">
                                <h3>{car.name}</h3>
                                <div className="car-details">
                                    <p><strong>Exterior:</strong> {car.exterior}</p>
                                    <p><strong>Wheels:</strong> {car.wheels}</p>
                                    <p><strong>Roof:</strong> {car.roof}</p>
                                    <p><strong>Interior:</strong> {car.interior}</p>
                                    <p className="price"><strong>Price:</strong> {formatPrice(parseFloat(car.price))}</p>
                                </div>
                                
                                <div className="car-actions">
                                    <Link 
                                        to={`/customcars/${car.id}`} 
                                        className="action-button view-button"
                                    >
                                        View Details
                                    </Link>
                                    <Link 
                                        to={`/edit/${car.id}`} 
                                        className="action-button edit-button"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(car.id, car.name)}
                                        className="action-button delete-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars