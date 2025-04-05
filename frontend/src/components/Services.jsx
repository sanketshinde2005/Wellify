import React from 'react';
import { 
  Stethoscope, 
  Calendar, 
  ClipboardCheck, 
  Users, 
  BarChart3, 
  FileText, 
  Shield, 
  Pill, 
  ChevronRight 
} from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, color }) => {
  const bgColorClass = `bg-${color}-100`;
  const textColorClass = `text-${color}-600`;
  const borderColorClass = `border-${color}-200`;
  const hoverBgClass = `hover:bg-${color}-50`;

  return (
    <div className={`bg-white rounded-xl shadow-md p-8 flex flex-col border ${borderColorClass} ${hoverBgClass} transition-all duration-300 transform hover:-translate-y-1`}>
      <div className={`mb-5 p-4 ${bgColorClass} ${textColorClass} rounded-full self-start`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <a 
        href="#" 
        className={`mt-2 ${textColorClass} font-medium flex items-center group`}
      >
        Learn more 
        <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
      </a>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: ClipboardCheck,
      title: "Electronic Health Records",
      description: "Secure, comprehensive, and easy-to-use EHR system that streamlines patient data management and enhances clinical workflows.",
      color: "blue"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Intelligent scheduling system that optimizes clinic capacity, reduces wait times, and sends automated reminders to patients.",
      color: "indigo"
    },
    {
      icon: Stethoscope,
      title: "Clinical Management",
      description: "Tools for monitoring patient care pathways, managing treatments, and ensuring adherence to medical protocols.",
      color: "purple"
    },
    {
      icon: Users,
      title: "Patient Portal",
      description: "Patient-centered platform allowing easy access to records, appointment booking, secure messaging, and prescription requests.",
      color: "pink"
    },
    {
      icon: Pill,
      title: "Pharmacy Integration",
      description: "Seamless integration with pharmacy systems for e-prescriptions, medication management, and inventory tracking.",
      color: "red"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Powerful analytics tools to track clinical outcomes, operational efficiency, and financial performance metrics.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "HIPAA-compliant security measures, role-based access control, and comprehensive audit trails to protect patient data.",
      color: "amber"
    },
    {
      icon: FileText,
      title: "Billing & Claims",
      description: "Integrated billing system that streamlines insurance claims processing, reduces denials, and improves revenue cycle management.",
      color: "green"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Comprehensive Healthcare Solutions</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Our Medical Management Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our integrated healthcare management system provides everything medical practices need to deliver exceptional patient care while optimizing operational efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
            />
          ))}
        </div>
        
        <div className="mt-20 p-8 bg-white rounded-xl shadow-lg max-w-4xl mx-auto text-center border-t-4 border-blue-500">
          <h3 className="text-2xl font-bold mb-4">Need a Customized Solution?</h3>
          <p className="text-gray-600 mb-8 text-lg">
            We understand that every healthcare facility has unique requirements. Our team can build a tailored solution that perfectly fits your specific needs.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a 
              href="#demo" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Request a Demo
            </a>
            <a 
              href="#contact" 
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
      
      {/* Testimonial section */}
      <div className="container mx-auto px-4 mt-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <span className="text-blue-200 font-medium">TESTIMONIAL</span>
              <h3 className="text-2xl lg:text-3xl font-bold mt-2">What Our Clients Say</h3>
              <div className="w-16 h-1 bg-white mt-4"></div>
            </div>
            <div className="lg:w-2/3 lg:pl-16">
              <p className="text-xl italic mb-6">
                "Implementing this healthcare management system has transformed our practice. Patient wait times are down 40%, our billing errors have decreased by 85%, and our staff can focus more on patient care instead of paperwork."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  DC
                </div>
                <div className="ml-4">
                  <p className="font-bold">Dr. Catherine Miller</p>
                  <p className="text-blue-200">Medical Director, Greenview Medical Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;