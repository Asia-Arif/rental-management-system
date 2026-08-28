import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    BedDouble,
    Bath,
    Home,
    CircleDollarSign,
    CheckCircle,
} from "lucide-react";

const PropertyDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const properties = [
        {
            id: 1,
            title: "Modern Family House",
            location: "Islamabad",
            rent: "45,000",
            bedrooms: 3,
            bathrooms: 2,
            type: "House",
            description:
                "A beautiful and spacious family house located in a peaceful area. The property is suitable for families and offers comfortable living space.",
            features: [
                "Spacious rooms",
                "Parking available",
                "Water supply",
                "Electricity available",
                "Nearby market",
                "Safe neighborhood",
            ],
        },
        {
            id: 2,
            title: "Luxury Apartment",
            location: "Rawalpindi",
            rent: "35,000",
            bedrooms: 2,
            bathrooms: 2,
            type: "Apartment",
            description:
                "A modern apartment with comfortable rooms and all basic facilities. Located in a convenient area close to markets and public transport.",
            features: [
                "Modern kitchen",
                "Parking available",
                "Security",
                "Water supply",
                "Nearby market",
                "Public transport nearby",
            ],
        },
        {
            id: 3,
            title: "Spacious Portion",
            location: "Lahore",
            rent: "40,000",
            bedrooms: 3,
            bathrooms: 2,
            type: "Portion",
            description:
                "A spacious portion ideal for a small family. The property provides a comfortable environment with essential facilities.",
            features: [
                "Three bedrooms",
                "Spacious kitchen",
                "Parking available",
                "Water supply",
                "Electricity available",
                "Nearby schools",
            ],
        },
        {
            id: 4,
            title: "Beautiful Family Home",
            location: "Islamabad",
            rent: "55,000",
            bedrooms: 4,
            bathrooms: 3,
            type: "House",
            description:
                "A beautiful family home with four bedrooms and modern facilities. Perfect for a large family looking for a comfortable home.",
            features: [
                "Four bedrooms",
                "Large living area",
                "Parking available",
                "Modern kitchen",
                "Security",
                "Peaceful location",
            ],
        },
    ];

    const property = properties.find(
        (property) => property.id === Number(id)
    );

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <button
                    onClick={() => navigate("/tenant/available-properties")}
                    className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft size={20} />
                    Back to Properties
                </button>

                <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                    <Home size={50} className="mx-auto mb-4 text-gray-400" />

                    <h2 className="text-xl font-semibold text-gray-800">
                        Property Not Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        The property you are looking for does not exist.
                    </p>
                </div>
            </div>
        );
    }

    const handleRequest = () => {
        alert(
            `Rental request sent for ${property.title}. The owner will review your request.`
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate("/tenant/available-properties")}
                className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
                <ArrowLeft size={20} />
                Back to Properties
            </button>

            {/* Property Card */}
            <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                {/* Image */}
                <div className="flex h-72 items-center justify-center bg-gray-100">
                    <Home size={90} className="text-gray-400" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Title & Status */}
                    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {property.title}
                                </h1>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                    Available
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500">
                                <MapPin size={18} />
                                {property.location}
                            </div>
                        </div>

                        {/* Rent */}
                        <div className="rounded-lg bg-blue-50 px-5 py-3">
                            <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                                <CircleDollarSign size={22} />
                                {property.rent}
                            </div>

                            <p className="text-right text-sm text-gray-500">
                                per month
                            </p>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="mb-8 grid grid-cols-1 gap-4 border-y border-gray-100 py-6 sm:grid-cols-3">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gray-100 p-3">
                                <BedDouble size={22} className="text-gray-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Bedrooms</p>
                                <p className="font-semibold text-gray-800">
                                    {property.bedrooms}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gray-100 p-3">
                                <Bath size={22} className="text-gray-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Bathrooms</p>
                                <p className="font-semibold text-gray-800">
                                    {property.bathrooms}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gray-100 p-3">
                                <Home size={22} className="text-gray-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Property Type</p>
                                <p className="font-semibold text-gray-800">
                                    {property.type}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="mb-3 text-xl font-semibold text-gray-800">
                            Description
                        </h2>

                        <p className="leading-7 text-gray-600">
                            {property.description}
                        </p>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">
                            Property Features
                        </h2>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {property.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-gray-600"
                                >
                                    <CheckCircle size={18} className="text-green-600" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Request Button */}
                    <div className="border-t border-gray-100 pt-6">
                        <button
                            onClick={handleRequest}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:w-auto"
                        >
                            Request to Rent
                        </button>

                        <p className="mt-2 text-sm text-gray-500">
                            Your request will be sent to the property owner for approval.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;