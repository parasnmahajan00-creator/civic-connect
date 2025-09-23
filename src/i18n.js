import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language translations
const resources = {
  en: {
    translation: {
      // Header
      "home": "Home",
      "report_issue": "Report Issue",
      "issues": "Issues",
      "map": "Map",
      "dashboard": "Dashboard",
      "dark_mode": "🌙 Dark",
      "light_mode": "☀️ Light",
      
      // Home Page
      "report_civic_issues": "Report civic issues. Track fixes. Make change.",
      "fast_hackathon_demo": "Fast hackathon demo — single page prototype with map, filters, charts, photo upload, and theme persistence.",
      "report_now": "Report Now",
      "view_issues": "View Issues",
      "total": "Total",
      "pending": "Pending",
      "resolved": "Resolved",
      "photo_evidence": "📷 Photo evidence",
      "map_pins": "🗺️ Map pins",
      "live_stats": "📊 Live stats",
      "quick_report": "Quick report",
      "your_name": "Your name",
      "location_optional": "Location (optional)",
      "short_description": "Short description",
      "quick_submit": "Quick Submit",
      "full_form": "Full form",
      
      // Report Issue Page
      "report_an_issue": "Report an Issue",
      "describe_the_issue": "Describe the issue",
      "what_happened": "What happened, where, how long...",
      "category": "Category",
      "urgency": "Urgency",
      "location": "Location (address or GPS)",
      "click_on_map": "Click on the map or tap geo button",
      "photo_jpg_png": "Photo (jpg/png) — optional",
      "submit_report": "Submit Report",
      "reset": "Reset",
      "get_location": "Get Location",
      "locating": "Locating...",
      "select_category": "Select category",
      "low": "Low",
      "medium": "Medium",
      "high": "High",
      
      // Issues Page
      "reported_issues": "Reported Issues",
      "search_by_description": "Search by description/location...",
      "all": "All",
      "pothole": "Pothole",
      "streetlight": "Streetlight",
      "garbage": "Garbage",
      "water": "Water",
      "sewage": "Sewage",
      "other": "Other",
      "clear_all": "Clear All",
      "Export": "Export",
      "no_reports_found": "No reports found",
      "try_changing_filters": "Try changing your filters or search query",
      "by": "By",
      "status_updated": "Status updated",
      "is_now": "is now",
      
      // Map Page
      "issue_map": "Issue Map",
      "click_on_map_select": "Click on the map to select a location for a new report. Markers show existing reports with colors indicating status.",
      
      // Dashboard Page
      "issue_status": "Issue Status",
      "issues_by_category": "Issues by Category",
      "issues_by_urgency": "Issues by Urgency",
      "resolved_rate": "Resolved Rate",
      "summary": "Summary",
      "you_have_total": "You have",
      "total_reports": "total reports with",
      "pending_and": "pending and",
      "resolved_issues": "resolved. The most common issue category is",
      "reports": "Reports",
      "newest_first": "Newest First",
      "oldest_first": "Oldest First",
      "by_category": "By Category",
      "by_status": "By Status",
      "current_location": "Current Location",
      "your_current_location": "Your current location",
      "you": "You",
      
      // Toast Messages
      "report_added": "Report added",
      "saved_locally": "Saved locally — appears on the map & dashboard.",
      "cleared": "Cleared",
      "all_local_reports_removed": "All local reports removed.",
      
      // Validation Messages
      "description_required": "Description is required",
      "category_required": "Category is required",
      "location_too_long": "Location is too long (max 200 characters)",
      "description_too_long": "Description is too long (max 1000 characters)",
      "name_too_long": "Name is too long (max 100 characters)",
      
      // Geolocation Messages
      "getting_location": "Getting location...",
      "location_captured": "Location captured successfully",
      "location_captured_short": "Location captured",
      "unable_to_fetch_location": "Unable to fetch location",
      "location_access_denied": "Location access denied. Please enable location permissions in your browser settings.",
      "location_unavailable": "Location information is unavailable. Please try again.",
      "location_timeout": "Location request timed out. Please try again.",
      "location_not_supported": "Geolocation is not supported by your browser",
      
      // Error Messages
      "invalid_file": "Please select a valid image file (jpg, png, etc.)",
      "file_size_exceeds": "File size exceeds 5MB limit",
      "submit_failed": "Failed to submit report. Please try again.",
      "address_fetch_failed": "Failed to get address for location"
    }
  },
  hi: {
    translation: {
      // Header
      "home": "होम",
      "report_issue": "समस्या रिपोर्ट करें",
      "issues": "समस्याएँ",
      "map": "नक्शा",
      "dashboard": "डैशबोर्ड",
      "dark_mode": "🌙 डार्क",
      "light_mode": "☀️ लाइट",
      
      // Home Page
      "report_civic_issues": "नागरिक समस्याएँ रिपोर्ट करें। सुधार पर नज़र रखें। बदलाव लाएँ।",
      "fast_hackathon_demo": "तेज़ हैकाथॉन डेमो - मैप, फ़िल्टर, चार्ट, फोटो अपलोड और थीम स्थायित्व के साथ एकल पृष्ठ प्रोटोटाइप।",
      "report_now": "अभी रिपोर्ट करें",
      "view_issues": "समस्याएँ देखें",
      "total": "कुल",
      "pending": "लंबित",
      "resolved": "हल किया गया",
      "photo_evidence": "📷 फोटो साक्ष्य",
      "map_pins": "🗺️ मैप पिन",
      "live_stats": "📊 लाइव आँकड़े",
      "quick_report": "त्वरित रिपोर्ट",
      "your_name": "आपका नाम",
      "location_optional": "स्थान (वैकल्पिक)",
      "short_description": "संक्षिप्त विवरण",
      "quick_submit": "त्वरित सबमिट",
      "full_form": "पूर्ण फॉर्म",
      
      // Report Issue Page
      "report_an_issue": "एक समस्या की रिपोर्ट करें",
      "describe_the_issue": "समस्या का विवरण दें",
      "what_happened": "क्या हुआ, कहाँ, कितने समय से...",
      "category": "श्रेणी",
      "urgency": "तत्परता",
      "location": "स्थान (पता या GPS)",
      "click_on_map": "मैप पर क्लिक करें या जियो बटन दबाएँ",
      "photo_jpg_png": "फोटो (jpg/png) - वैकल्पिक",
      "submit_report": "रिपोर्ट सबमिट करें",
      "reset": "रीसेट",
      "get_location": "स्थान प्राप्त करें",
      "locating": "स्थान खोजा जा रहा है...",
      "select_category": "श्रेणी चुनें",
      "low": "कम",
      "medium": "मध्यम",
      "high": "उच्च",
      
      // Issues Page
      "reported_issues": "रिपोर्ट की गई समस्याएँ",
      "search_by_description": "विवरण/स्थान द्वारा खोजें...",
      "all": "सभी",
      "pothole": "गड्ढा",
      "streetlight": "सड़क की रोशनी",
      "garbage": "कचरा",
      "water": "पानी",
      "sewage": "नाले की गंदगी",
      "other": "अन्य",
      "clear_all": "सभी साफ करें",
      "Export": "निर्यात करें",
      "no_reports_found": "कोई रिपोर्ट नहीं मिली",
      "try_changing_filters": "अपने फ़िल्टर या खोज क्वेरी को बदलने का प्रयास करें",
      "by": "द्वारा",
      "status_updated": "स्थिति अपडेट की गई",
      "is_now": "अब है",
      
      // Map Page
      "issue_map": "समस्या नक्शा",
      "click_on_map_select": "एक नई रिपोर्ट के लिए मैप पर क्लिक करें। मार्कर मौजूदा रिपोर्ट दिखाते हैं जिसमें रंग स्थिति को इंगित करते हैं।",
      
      // Dashboard Page
      "issue_status": "समस्या की स्थिति",
      "issues_by_category": "श्रेणी के अनुसार समस्याएँ",
      "issues_by_urgency": "तत्परता के अनुसार समस्याएँ",
      "resolved_rate": "हल करने की दर",
      "summary": "सारांश",
      "you_have_total": "आपके पास है",
      "total_reports": "कुल रिपोर्टें इतनी",
      "pending_and": "लंबित और",
      "resolved_issues": "हल किए गए। सबसे सामान्य समस्या श्रेणी है",
      "reports": "रिपोर्टें",
      "newest_first": "नवीनतम पहले",
      "oldest_first": "सबसे पुराना पहले",
      "by_category": "श्रेणी के अनुसार",
      "by_status": "स्थिति के अनुसार",
      "current_location": "वर्तमान स्थान",
      "your_current_location": "आपका वर्तमान स्थान",
      "you": "आप",
      
      // Toast Messages
      "report_added": "रिपोर्ट जोड़ी गई",
      "saved_locally": "स्थानीय रूप से सहेजा गया - मैप और डैशबोर्ड पर दिखाई देता है।",
      "cleared": "साफ किया गया",
      "all_local_reports_removed": "सभी स्थानीय रिपोर्टें हटा दी गईं।",
      
      // Validation Messages
      "description_required": "विवरण आवश्यक है",
      "category_required": "श्रेणी आवश्यक है",
      "location_too_long": "स्थान बहुत लंबा है (अधिकतम 200 अक्षर)",
      "description_too_long": "विवरण बहुत लंबा है (अधिकतम 1000 अक्षर)",
      "name_too_long": "नाम बहुत लंबा है (अधिकतम 100 अक्षर)",
      
      // Geolocation Messages
      "getting_location": "स्थान प्राप्त किया जा रहा है...",
      "location_captured": "स्थान सफलतापूर्वक प्राप्त किया गया",
      "location_captured_short": "स्थान प्राप्त किया गया",
      "unable_to_fetch_location": "स्थान प्राप्त करने में असमर्थ",
      "location_access_denied": "स्थान पहुँच अस्वीकृत। कृपया अपने ब्राउज़र सेटिंग्स में स्थान अनुमतियाँ सक्षम करें।",
      "location_unavailable": "स्थान जानकारी अनुपलब्ध है। कृपया पुनः प्रयास करें।",
      "location_timeout": "स्थान अनुरोध का समय समाप्त हो गया है। कृपया पुनः प्रयास करें।",
      "location_not_supported": "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है",
      
      // Error Messages
      "invalid_file": "कृपया एक मान्य छवि फ़ाइल (jpg, png, आदि) चुनें",
      "file_size_exceeds": "फ़ाइल आकार 5MB सीमा से अधिक है",
      "submit_failed": "रिपोर्ट सबमिट करने में विफल। कृपया पुनः प्रयास करें।",
      "address_fetch_failed": "स्थान के लिए पता प्राप्त करने में विफल"
    }
  },
  ta: {
    translation: {
      // Header
      "home": "முகப்பு",
      "report_issue": "சிக்கலை தெரிவி",
      "issues": "சிக்கல்கள்",
      "map": "வரைபடம்",
      "dashboard": "டாஷ்போர்டு",
      "dark_mode": "🌙 இருள்",
      "light_mode": "☀️ ஒளி",
      
      // Home Page
      "report_civic_issues": "குடிமக்கள் சிக்கல்களை தெரிவி. சரிசெய்வதை கண்காணிக்கவும். மாற்றத்தை செய்யுங்கள்.",
      "fast_hackathon_demo": "விரைவான ஹேக்கதான் டெமோ - வரைபடம், வடிப்பான்கள், விளக்கப்படங்கள், புகைப்பட பதிவேற்றம் மற்றும் கருப்பொருள் நிலைத்தன்மை கொண்ட ஒற்றை பக்க மாதிரி.",
      "report_now": "இப்போது தெரிவி",
      "view_issues": "சிக்கல்களை பார்வையிடு",
      "total": "மொத்தம்",
      "pending": "நிலுவையில்",
      "resolved": "தீர்க்கப்பட்டது",
      "photo_evidence": "📷 புகைப்பட சான்று",
      "map_pins": "🗺️ வரைபட பின்கள்",
      "live_stats": "📊 நேரடி புள்ளிவிவரங்கள்",
      "quick_report": "விரைவான தெரிவிப்பு",
      "your_name": "உங்கள் பெயர்",
      "location_optional": "இடம் (கட்டாயமல்ல)",
      "short_description": "குறுகிய விளக்கம்",
      "quick_submit": "விரைவாக சமர்ப்பி",
      "full_form": "முழு படிவம்",
      
      // Report Issue Page
      "report_an_issue": "ஒரு சிக்கலை தெரிவி",
      "describe_the_issue": "சிக்கலை விளக்கவும்",
      "what_happened": "என்ன நடந்தது, எங்கு, எவ்வளவு நேரம்...",
      "category": "வகை",
      "urgency": "அவசரம்",
      "location": "இடம் (முகவரி அல்லது GPS)",
      "click_on_map": "வரைபடத்தில் கிளிக் செய்யவும் அல்லது ஜியோ பொத்தானைத் தட்டவும்",
      "photo_jpg_png": "புகைப்படம் (jpg/png) - விருப்பத்தேர்வு",
      "submit_report": "தெரிவிப்பை சமர்ப்பி",
      "reset": "மீட்டமை",
      "get_location": "இடத்தைப் பெறு",
      "locating": "இடம் கண்டறியப்படுகிறது...",
      "select_category": "வகையைத் தேர்ந்தெடு",
      "low": "குறைவு",
      "medium": "நடுத்தரம்",
      "high": "அதிகம்",
      
      // Issues Page
      "reported_issues": "தெரிவிக்கப்பட்ட சிக்கல்கள்",
      "search_by_description": "விளக்கம்/இடம் மூலம் தேடு...",
      "all": "அனைத்தும்",
      "pothole": "பொதுவழி குழி",
      "streetlight": "தெரு விளக்கு",
      "garbage": "குப்பை",
      "water": "நீர்",
      "sewage": "கழிவுநீர்",
      "other": "மற்றவை",
      "clear_all": "அனைத்தையும் அழி",
      "Export": "ஏற்றுமதி",
      "no_reports_found": "எந்த அறிக்கைகளும் கிடைக்கவில்லை",
      "try_changing_filters": "உங்கள் வடிப்பான்கள் அல்லது தேடல் வினவலை மாற்ற முயற்சிக்கவும்",
      "by": "மூலம்",
      "status_updated": "நிலை புதுப்பிக்கப்பட்டது",
      "is_now": "இப்போது",
      
      // Map Page
      "issue_map": "சிக்கல் வரைபடம்",
      "click_on_map_select": "புதிய அறிக்கைக்கு வரைபடத்தில் கிளிக் செய்யவும். குறிப்புகள் இருக்கும் அறிக்கைகளைக் காட்டுகின்றன மேலும் நிறங்கள் நிலையைக் குறிக்கின்றன.",
      
      // Dashboard Page
      "issue_status": "சிக்கல் நிலை",
      "issues_by_category": "வகை மூலம் சிக்கல்கள்",
      "issues_by_urgency": "அவசரம் மூலம் சிக்கல்கள்",
      "resolved_rate": "தீர்க்கப்பட்ட விகிதம்",
      "summary": "சுருக்கம்",
      "you_have_total": "உங்களிடம் உள்ளது",
      "total_reports": "மொத்த அறிக்கைகள் இதில்",
      "pending_and": "நிலுவையில் மேலும்",
      "resolved_issues": "தீர்க்கப்பட்டது. மிகவும் பொதுவான சிக்கல் வகை என்பது",
      "reports": "அறிக்கைகள்",
      "newest_first": "மிகபுதியவை முதலில்",
      "oldest_first": "மிகபழையவை முதலில்",
      "by_category": "வகை மூலம்",
      "by_status": "நிலை மூலம்",
      "current_location": "தற்போதைய இடம்",
      "your_current_location": "உங்கள் தற்போதைய இடம்",
      "you": "நீங்கள்",
      
      // Toast Messages
      "report_added": "அறிக்கை சேர்க்கப்பட்டது",
      "saved_locally": "உள்ளூரில் சேமிக்கப்பட்டது - வரைபடம் மற்றும் டாஷ்போர்டில் தெரியும்.",
      "cleared": "அழிக்கப்பட்டது",
      "all_local_reports_removed": "அனைத்து உள்ளூர் அறிக்கைகளும் நீக்கப்பட்டன.",
      
      // Validation Messages
      "description_required": "விளக்கம் தேவை",
      "category_required": "வகை தேவை",
      "location_too_long": "இடம் மிக நீளமாக உள்ளது (அதிகபட்சம் 200 எழுத்துகள்)",
      "description_too_long": "விளக்கம் மிக நீளமாக உள்ளது (அதிகபட்சம் 1000 எழுத்துகள்)",
      "name_too_long": "பெயர் மிக நீளமாக உள்ளது (அதிகபட்சம் 100 எழுத்துகள்)",
      
      // Geolocation Messages
      "getting_location": "இடம் பெறப்படுகிறது...",
      "location_captured": "இடம் வெற்றிகரமாக பெறப்பட்டது",
      "location_captured_short": "இடம் பெறப்பட்டது",
      "unable_to_fetch_location": "இடத்தைப் பெற முடியவில்லை",
      "location_access_denied": "இட அணுகல் மறுக்கப்பட்டது. உங்கள் உலாவி அமைப்புகளில் இட அனுமதிகளை இயக்கவும்.",
      "location_unavailable": "இட தகவல் கிடைக்கவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      "location_timeout": "இட கோரிக்கை நேரம் முடிந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      "location_not_supported": "உங்கள் உலாவி ஜியோலொகேஷனை ஆதரிக்கவில்லை",
      
      // Error Messages
      "invalid_file": "தயவுசெய்து சரியான படக் கோப்பை (jpg, png, போன்றவை) தேர்ந்தெடுக்கவும்",
      "file_size_exceeds": "கோப்பு அளவு 5MB வரம்பை மீறுகிறது",
      "submit_failed": "அறிக்கையை சமர்ப்பிப்பதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      "address_fetch_failed": "இடத்திற்கான முகவரியைப் பெறுவதில் தோல்வி"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;