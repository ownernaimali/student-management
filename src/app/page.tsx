"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  GraduationCap, 
  Menu, 
  X, 
  BookOpen, 
  Users, 
  Calendar,
  Star,
  Phone,
  Mail,
  MapPin
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ]

  const stats = [
    { label: "Established", value: "1985" },
    { label: "Students", value: "1,200+" },
    { label: "Faculty", value: "85+" },
    { label: "AP Courses", value: "15+" },
  ]

  const academics = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Elementary School",
      description: "Our elementary program focuses on foundational skills in reading, writing, and mathematics while fostering curiosity and creativity."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Middle School",
      description: "Our middle school curriculum challenges students academically while providing strong support systems during these transitional years."
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "High School",
      description: "Our comprehensive high school program includes AP courses, career pathways, and college preparation to ensure student success."
    }
  ]

  const events = [
    {
      image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24",
      category: "Science",
      date: "May 15, 2023",
      title: "Annual Science Fair",
      description: "Students showcase their innovative projects in our annual science fair. Open to the public."
    },
    {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      category: "Sports",
      date: "June 2, 2023",
      title: "Sports Day",
      description: "Annual inter-house sports competition. Come cheer for your favorite team!"
    },
    {
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      category: "Graduation",
      date: "June 15, 2023",
      title: "Class of 2023 Graduation",
      description: "Celebrate the achievements of our graduating seniors at this special ceremony."
    }
  ]

  const testimonials = [
    {
      rating: 5,
      text: "Greenwood High has provided my child with an exceptional education and countless opportunities for personal growth. The teachers are dedicated and truly care about each student's success.",
      name: "Sarah Johnson",
      role: "Parent of 8th Grader",
      image: "https://randomuser.me/api/portraits/women/43.jpg"
    },
    {
      rating: 5,
      text: "The AP program at Greenwood prepared me extremely well for college. I entered university with 15 credits and felt ahead of many of my peers. The teachers challenge you but also support you.",
      name: "Michael Chen",
      role: "Class of 2022",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ]

  const quickLinks = [
    { name: "Calendar", href: "#" },
    { name: "Staff Directory", href: "#" },
    { name: "Lunch Menu", href: "#" },
    { name: "Parent Portal", href: "#" },
    { name: "Student Portal", href: "#" }
  ]

  const resources = [
    { name: "Library", href: "#" },
    { name: "Athletics", href: "#" },
    { name: "Clubs", href: "#" },
    { name: "Counseling", href: "#" },
    { name: "Alumni", href: "#" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 mr-2" />
                <span className="font-bold text-xl">Greenwood High</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-blue-200 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-blue-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Greenwood High School
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Excellence in Education Since 1985
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-800 hover:bg-gray-100 font-bold"
            >
              Apply Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white bg-blue-800 text-white hover:bg-white hover:text-blue-800 font-bold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Our School</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1588072432836-e10032774350" 
                alt="School Building" 
                className="rounded-lg shadow-xl w-full h-64 md:h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Greenwood High School is committed to providing a nurturing environment that fosters academic excellence, 
                personal growth, and social responsibility. We empower students to become lifelong learners and responsible 
                global citizens.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-blue-800 mb-2">{stat.label}</h4>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Academics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {academics.map((academic, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="text-blue-600 mb-4">
                    {academic.icon}
                  </div>
                  <CardTitle className="text-xl">{academic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {academic.description}
                  </p>
                  <Button variant="link" className="p-0 text-blue-600 font-semibold">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`bg-${
                      event.category === 'Science' ? 'blue' : 
                      event.category === 'Sports' ? 'green' : 'purple'
                    }-100 text-${
                      event.category === 'Science' ? 'blue' : 
                      event.category === 'Sports' ? 'green' : 'purple'
                    }-800 text-xs font-semibold px-2.5 py-0.5 rounded`}>
                      {event.category}
                    </span>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>
                  <Button variant="link" className="p-0 text-blue-600 font-semibold">
                    Details →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Parents & Students Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a tour or begin the application process today. Our admissions team is ready to answer your questions.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-800 hover:bg-gray-100 font-bold"
            >
              Apply Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-blue-800 hover:bg-white hover:text-blue-800 font-bold"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* School Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Greenwood High School</h3>
              <div className="text-gray-400 mb-4 space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>123 Education Avenue<br />Springfield, ST 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@greenwoodhigh.edu</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.href} className="text-gray-400 hover:text-white transition-colors">
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-6">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
              <h4 className="font-bold mb-2">Newsletter</h4>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none text-gray-900"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2023 Greenwood High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
