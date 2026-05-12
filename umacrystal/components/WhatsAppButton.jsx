import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/919327105966"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 ease-in-out hover:-translate-y-1 relative"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 text-white" />
        
        {/* Pulse effect rings */}
        <span className="absolute w-full h-full rounded-full border-2 border-green-500 animate-ping opacity-75"></span>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-text text-sm font-medium py-1.5 px-3 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
          Chat with us
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-white"></div>
        </div>
      </a>
    </div>
  );
}
