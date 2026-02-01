const { useState, useEffect, useRef, useCallback } = React;

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, title, message, type = 'success', actions }) => {
    if (!isOpen) return null;
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!actions) onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [actions, onClose]);

    const iconMap = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '!'
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className={`modal-icon modal-${type}`}>
                    {iconMap[type]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                {actions ? (
                    <div className="flex gap-3 justify-center">
                        {actions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={action.onClick}
                                className={`px-6 py-2 rounded-full font-bold ${action.primary ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                ) : (
                    <button onClick={onClose} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">
                        Close
                    </button>
                )}
            </div>
        </div>
    );
};

// Exit Confirmation Modal Component
const ExitConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="exit-modal-overlay" onClick={onCancel}>
            <div className="exit-modal-content" onClick={e => e.stopPropagation()}>
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">?</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Do you want to exit this website?</h3>
                <p className="text-gray-600 mb-6">You are about to leave Next Order SL</p>
                <div className="flex gap-3 justify-center">
                    <button onClick={onConfirm} className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors">
                        YES
                    </button>
                    <button onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-colors">
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
};

// NEW: Affiliate Login Required Modal
const AffiliateLoginModal = ({ isOpen, onClose, onLoginClick }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-icon modal-info">
                    <Icons.Lock />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600 mb-6">Please register and log in to access the affiliate program.</p>
                <div className="flex gap-3 justify-center">
                    <button 
                        onClick={() => { onClose(); onLoginClick(); }}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700"
                    >
                        Go to Login
                    </button>
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const Icons = {
    Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    Home: ({ active }) => <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    Message: ({ active }) => <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    Cart: ({ active }) => <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    Work: ({ active }) => <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    User: ({ active }) => <svg className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    Sparkles: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 8a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>,
    ChevronRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    Clock: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    ArrowLeft: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    Trash: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    Link: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    Image: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Document: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Edit: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    Tag: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
    Package: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    Upload: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    Mail: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Palette: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    Play: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Megaphone: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
    Key: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
    Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    Affiliate: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    Phone: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    Loader: () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>,
    Share: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
    WhatsApp: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    Facebook: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    Twitter: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
    Copy: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
};

// Marketplace Detection Utility
const detectMarketplace = (url) => {
    if (!url) return { name: 'Other', class: 'badge-other', category: 'General' };
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('aliexpress')) return { name: 'AliExpress', class: 'badge-aliexpress', category: 'AliExpress' };
    if (lowerUrl.includes('daraz')) return { name: 'Daraz', class: 'badge-daraz', category: 'Daraz' };
    if (lowerUrl.includes('ebay')) return { name: 'eBay', class: 'badge-ebay', category: 'eBay' };
    if (lowerUrl.includes('amazon')) return { name: 'Amazon', class: 'badge-amazon', category: 'Amazon' };
    if (lowerUrl.includes('alibaba')) return { name: 'Alibaba', class: 'badge-alibaba', category: 'Alibaba' };
    
    return { name: 'Other', class: 'badge-other', category: 'General' };
};

const App = () => {
    // Site Settings State with localStorage
    const [siteSettings, setSiteSettings] = useState(() => {
        const saved = localStorage.getItem('nextordersl_settings');
        return saved ? JSON.parse(saved) : {
            siteName: 'Next Order SL',
            primaryColor: 'indigo',
            secondaryColor: 'rose',
            currency: 'LKR',
            flashSaleEnabled: true,
            flashSaleTitle: 'Flash Sale',
            flashSaleSubtitle: 'Up to 70% Off',
            freeShippingThreshold: 2000,
            animationsEnabled: true,
            animationType: 'fade',
            themeMode: 'light'
        };
    });

    // Admin Credentials State with localStorage
    const [adminCredentials, setAdminCredentials] = useState(() => {
        const saved = localStorage.getItem('nextordersl_admin');
        return saved ? JSON.parse(saved) : {
            email: 'admin@nextordersl.com',
            password: 'admin123'
        };
    });

    // Login Session Persistence
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const saved = localStorage.getItem('nextordersl_isLoggedIn');
        return saved ? JSON.parse(saved) : false;
    });
    const [isAdmin, setIsAdmin] = useState(() => {
        const saved = localStorage.getItem('nextordersl_isAdmin');
        return saved ? JSON.parse(saved) : false;
    });
    const [isAffiliate, setIsAffiliate] = useState(() => {
        const saved = localStorage.getItem('nextordersl_isAffiliate');
        return saved ? JSON.parse(saved) : false;
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('nextordersl_currentUser');
        return saved ? JSON.parse(saved) : null;
    });

    // FIX 1: SINGLE SOURCE OF TRUTH - Products are managed from one consistent source
    // All product operations (add/edit/delete) go through this single state
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('nextordersl_products');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: "Wireless Bluetooth Headphones", price: 8999, originalPrice: 12500, discount: 28, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"], rating: "4.5", sold: 1234, desc: "Premium noise cancelling headphones with 20hr battery", affiliateLink: "https://www.aliexpress.com/item/1", category: "AliExpress", platform: "aliexpress" },
            { id: 2, title: "Smart Fitness Watch Pro", price: 12999, originalPrice: 18500, discount: 30, images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"], rating: "4.8", sold: 856, desc: "Track heart rate, steps, sleep and notifications", affiliateLink: "https://www.daraz.lk/product/2", category: "Daraz", platform: "daraz" },
            { id: 3, title: "Korean Skincare Set 5pcs", price: 4599, originalPrice: 6500, discount: 29, images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"], rating: "4.6", sold: 2341, desc: "Complete glass skin routine", affiliateLink: "https://www.amazon.com/product/3", category: "Amazon", platform: "amazon" },
            { id: 4, title: "eBay Refurbished iPhone 12", price: 85000, originalPrice: 120000, discount: 29, images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"], rating: "4.7", sold: 45, desc: "Fully tested and certified refurbished device", affiliateLink: "https://www.ebay.com/product/4", category: "eBay", platform: "ebay" },
            { id: 5, title: "Alibaba Wholesale Earbuds", price: 2999, originalPrice: 4500, discount: 33, images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"], rating: "4.3", sold: 5678, desc: "Bulk order TWS earbuds", affiliateLink: "https://www.alibaba.com/product/5", category: "Alibaba", platform: "alibaba" }
        ];
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('nextordersl_categories');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Beauty', icon: '✨', active: true },
            { id: 2, name: 'Electronics', icon: '📱', active: true },
            { id: 3, name: 'Fashion', icon: '👕', active: true },
            { id: 4, name: 'Home', icon: '🏠', active: true },
            { id: 5, name: 'Sports', icon: '⚽', active: true },
            { id: 6, name: 'Toys', icon: '🎮', active: true },
            { id: 7, name: 'AliExpress', icon: '🛒', active: true },
            { id: 8, name: 'Daraz', icon: '📦', active: true },
            { id: 9, name: 'eBay', icon: '🏷️', active: true },
            { id: 10, name: 'Amazon', icon: '📮', active: true },
            { id: 11, name: 'Alibaba', icon: '🏭', active: true }
        ];
    });

    const [banners, setBanners] = useState(() => {
        const saved = localStorage.getItem('nextordersl_banners');
        return saved ? JSON.parse(saved) : [
            { id: 1, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800', title: 'Payday Weekend Sale', subtitle: 'Up to 70% Off', active: true },
            { id: 2, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', title: 'Summer Collection', subtitle: 'New Arrivals', active: true }
        ];
    });

    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('nextordersl_posts');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'New Collection Arrival', content: 'Check out our latest products this season!', date: '2024-01-20', active: true },
            { id: 2, title: 'Weekend Sale Announcement', content: 'Up to 50% off on selected items this weekend only.', date: '2024-01-19', active: true }
        ];
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('nextordersl_orders');
        return saved ? JSON.parse(saved) : [
            { id: 'ORD001', customer: 'John Doe', email: 'john@example.com', total: 12500, status: 'Pending', date: '2024-01-20', items: 2 },
            { id: 'ORD002', customer: 'Jane Smith', email: 'jane@example.com', total: 8900, status: 'Completed', date: '2024-01-19', items: 1 }
        ];
    });

    const [microJobsLeads, setMicroJobsLeads] = useState(() => {
        const saved = localStorage.getItem('nextordersl_microjobs');
        return saved ? JSON.parse(saved) : [];
    });

    // Advertisements State
    const [advertisements, setAdvertisements] = useState(() => {
        const saved = localStorage.getItem('nextordersl_ads');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Google AdSense Header', code: '', position: 'header', active: true },
            { id: 2, name: 'Google AdSense Sidebar', code: '', position: 'sidebar', active: false },
            { id: 3, name: 'Banner Ad - Home Top', code: '', position: 'home_top', active: false }
        ];
    });

    const [advertiserContacts, setAdvertiserContacts] = useState(() => {
        const saved = localStorage.getItem('nextordersl_advertisers');
        return saved ? JSON.parse(saved) : [];
    });
    
    // FIX 1: Affiliate users tracking - stores only affiliate metadata, not duplicate products
    const [affiliateUsers, setAffiliateUsers] = useState(() => {
        const saved = localStorage.getItem('nextordersl_affiliates');
        return saved ? JSON.parse(saved) : [];
    });
    
    // FIX 1: Track which products belong to which affiliate without duplicating product data
    const [affiliateProductIds, setAffiliateProductIds] = useState(() => {
        const saved = localStorage.getItem('nextordersl_affiliate_product_ids');
        return saved ? JSON.parse(saved) : {}; // Map of affiliateId -> [productIds]
    });
    
    // UI States
    const [activeTab, setActiveTab] = useState('home');
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('nextordersl_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCMS, setShowCMS] = useState(false);
    const [cmsSidebarOpen, setCmsSidebarOpen] = useState(false);
    const [cmsActiveTab, setCmsActiveTab] = useState('dashboard');
    const [authMode, setAuthMode] = useState('login');
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [authError, setAuthError] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState(() => {
        const saved = localStorage.getItem('nextordersl_users');
        return saved ? JSON.parse(saved) : [];
    });

    // Modal State
    const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'success' });

    // Affiliate Registration States
    const [showAffiliateReg, setShowAffiliateReg] = useState(false);
    const [affiliateRegStep, setAffiliateRegStep] = useState(1);
    const [affiliateRegForm, setAffiliateRegForm] = useState({ name: '', email: '', phone: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [affiliateRegError, setAffiliateRegError] = useState('');
    
    // Affiliate Dashboard States
    const [affiliateActiveTab, setAffiliateActiveTab] = useState('home');
    const [autoFillLoading, setAutoFillLoading] = useState(false);

    // Share Modal State
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareProduct, setShareProduct] = useState(null);

    // Form States
    const [editingProduct, setEditingProduct] = useState(null);
    // FIX 7: Support for multiple images - initialize with empty array for images
    const [productForm, setProductForm] = useState({
        title: '', price: '', originalPrice: '', description: '', images: [], affiliateLink: '', category: '', rating: '4.5'
    });
    const [autoFillLink, setAutoFillLink] = useState('');
    const [bulkImportData, setBulkImportData] = useState('');
    const [categoryForm, setCategoryForm] = useState({ name: '', icon: '' });
    const [bannerForm, setBannerForm] = useState({ image: '', title: '', subtitle: '' });
    const [postForm, setPostForm] = useState({ title: '', content: '' });
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingBanner, setEditingBanner] = useState(null);
    const [editingPost, setEditingPost] = useState(null);
    const [adminProfileForm, setAdminProfileForm] = useState({
        currentPassword: '',
        newEmail: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [profileUpdateMessage, setProfileUpdateMessage] = useState('');
    const [advertiserForm, setAdvertiserForm] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [advertiserMessage, setAdvertiserMessage] = useState('');

    // Infinite Scroll State
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const observerRef = useRef();
    const loadingRef = useRef(null);

    // Platform Filter State
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    // Exit Confirmation State
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);

    // FIX 2: Navigation History Stack for Daraz-style navigation - initialized with home
    const [navStack, setNavStack] = useState([{ type: 'home' }]);

    // FIX 4: URL Hash State for Product Sharing
    const [initialHashChecked, setInitialHashChecked] = useState(false);

    // NEW: Affiliate Login Modal State
    const [showAffiliateLoginModal, setShowAffiliateLoginModal] = useState(false);

    // Flash Sale Countdown State
    const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 15 });

    // FIX 7: Current image index for gallery
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Refs for history management to avoid dependency issues
    const productsRef = useRef(products);
    const isAdminRef = useRef(isAdmin);
    const isAffiliateRef = useRef(isAffiliate);
    // FIX 2 & 3: Refs for exit confirmation to avoid stale closures in popstate handler
    const allowExitRef = useRef(false);
    const exitConfirmationShownRef = useRef(false);

    // Update refs when values change
    useEffect(() => {
        productsRef.current = products;
    }, [products]);

    useEffect(() => {
        isAdminRef.current = isAdmin;
    }, [isAdmin]);

    useEffect(() => {
        isAffiliateRef.current = isAffiliate;
    }, [isAffiliate]);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('nextordersl_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('nextordersl_categories', JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('nextordersl_banners', JSON.stringify(banners));
    }, [banners]);

    useEffect(() => {
        localStorage.setItem('nextordersl_posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('nextordersl_orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('nextordersl_users', JSON.stringify(registeredUsers));
    }, [registeredUsers]);

    useEffect(() => {
        localStorage.setItem('nextordersl_cart', JSON.stringify(cart));
    }, [cart]);

    // FIX 1: Save affiliate product ID mappings
    useEffect(() => {
        localStorage.setItem('nextordersl_affiliate_product_ids', JSON.stringify(affiliateProductIds));
    }, [affiliateProductIds]);

    useEffect(() => {
        localStorage.setItem('nextordersl_affiliates', JSON.stringify(affiliateUsers));
    }, [affiliateUsers]);

    useEffect(() => {
        localStorage.setItem('nextordersl_settings', JSON.stringify(siteSettings));
    }, [siteSettings]);

    useEffect(() => {
        localStorage.setItem('nextordersl_admin', JSON.stringify(adminCredentials));
    }, [adminCredentials]);

    useEffect(() => {
        localStorage.setItem('nextordersl_ads', JSON.stringify(advertisements));
    }, [advertisements]);

    useEffect(() => {
        localStorage.setItem('nextordersl_advertisers', JSON.stringify(advertiserContacts));
    }, [advertiserContacts]);

    useEffect(() => {
        localStorage.setItem('nextordersl_microjobs', JSON.stringify(microJobsLeads));
    }, [microJobsLeads]);

    useEffect(() => {
        localStorage.setItem('nextordersl_isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('nextordersl_isAdmin', JSON.stringify(isAdmin));
    }, [isAdmin]);

    useEffect(() => {
        localStorage.setItem('nextordersl_isAffiliate', JSON.stringify(isAffiliate));
    }, [isAffiliate]);

    useEffect(() => {
        localStorage.setItem('nextordersl_currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    // FIX 4: Check URL hash on load for direct product linking
    useEffect(() => {
        if (!initialHashChecked) {
            const hash = window.location.hash;
            if (hash.startsWith('#product-')) {
                const productId = parseInt(hash.replace('#product-', ''));
                const product = products.find(p => p.id === productId);
                if (product) {
                    setSelectedProduct(product);
                    setActiveTab('home');
                }
            }
            setInitialHashChecked(true);
        }
    }, [products, initialHashChecked]);

    // FIX 4: Update URL when product selected
    useEffect(() => {
        if (selectedProduct) {
            window.history.pushState(null, null, `#product-${selectedProduct.id}`);
        } else {
            if (window.location.hash.startsWith('#product-')) {
                window.history.pushState(null, null, '#');
            }
        }
    }, [selectedProduct]);

    // FIX 2 & 3: History Stack Navigation and Exit Confirmation implementation
    // FIXED: Using refs to avoid stale closures and properly handle exit confirmation state
    useEffect(() => {
        const handlePopState = (e) => {
            // If allowing exit (user clicked YES), let browser handle it
            if (allowExitRef.current) {
                allowExitRef.current = false;
                return; // Allow the browser to actually go back (exit)
            }

            // If exit confirmation is showing, close it and stay on page
            // (User pressed back while modal was open - treat as "NO")
            if (exitConfirmationShownRef.current) {
                exitConfirmationShownRef.current = false;
                setShowExitConfirmation(false);
                // Push state to prevent actual browser back navigation
                window.history.pushState(null, '', window.location.href);
                return;
            }

            // Handle navigation back through our app states
            setNavStack(currentStack => {
                // If we're at the root (home), show exit confirmation
                if (currentStack.length <= 1) {
                    exitConfirmationShownRef.current = true;
                    setShowExitConfirmation(true);
                    // Push a dummy state to prevent the browser from actually going back
                    window.history.pushState(null, '', window.location.href);
                    return currentStack;
                }

                // Pop the current state to go back
                const newStack = currentStack.slice(0, -1);
                const prevState = newStack[newStack.length - 1];

                // Restore the UI state based on previous navigation state
                if (prevState.type === 'home') {
                    setActiveTab('home');
                    setSelectedProduct(null);
                    setShowCMS(false);
                    if (isAffiliateRef.current) setAffiliateActiveTab('home');
                } else if (prevState.type === 'tab') {
                    setActiveTab(prevState.value);
                    setSelectedProduct(null);
                    setShowCMS(false);
                } else if (prevState.type === 'product') {
                    const product = productsRef.current.find(p => p.id === prevState.id);
                    if (product) {
                        setSelectedProduct(product);
                    } else {
                        // Product not found, go to home
                        setSelectedProduct(null);
                        setActiveTab('home');
                    }
                } else if (prevState.type === 'cms') {
                    if (isAdminRef.current) {
                        setShowCMS(true);
                    }
                } else if (prevState.type === 'affiliate-tab') {
                    if (isAffiliateRef.current) {
                        setAffiliateActiveTab(prevState.tab);
                    }
                }

                return newStack;
            });
        };

        window.addEventListener('popstate', handlePopState);
        
        // Replace current state to ensure we have state object for home
        if (!window.history.state) {
            window.history.replaceState({ type: 'home' }, '', window.location.href);
        }
        
        return () => window.removeEventListener('popstate', handlePopState);
    }, []); // Empty deps - use refs for all mutable values to avoid stale closures

    // FIX 2: Helper to push navigation state to stack
    const pushNavState = useCallback((navState) => {
        setNavStack(prev => [...prev, navState]);
        window.history.pushState(navState, '', window.location.href);
    }, []);

    // FIX 2: Navigation function that properly pushes state - updated to use pushNavState
    const navigateTo = useCallback((target) => {
        if (typeof target === 'string') {
            setActiveTab(target);
            setSelectedProduct(null);
            pushNavState({ type: 'tab', value: target });
        }
    }, [pushNavState]);

    // FIX 3: Affiliate State Restoration - Validate on mount and restore
    useEffect(() => {
        if (isAffiliate && currentUser) {
            const validAffiliate = affiliateUsers.find(u => u.email === currentUser.email && u.status === 'active');
            if (!validAffiliate) {
                // Invalid state - user claims to be affiliate but not in registry
                setIsAffiliate(false);
                setCurrentUser(null);
                localStorage.removeItem('nextordersl_isAffiliate');
                localStorage.removeItem('nextordersl_currentUser');
            } else {
                // Ensure currentUser has latest affiliate data
                setCurrentUser({...validAffiliate, role: 'affiliate'});
            }
        }
    }, []); // Run once on mount

    // Flash Sale Countdown Timer
    useEffect(() => {
        if (!siteSettings.flashSaleEnabled) return;
        
        const timer = setInterval(() => {
            setFlashSaleTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        if (hours < 0) {
                            hours = 4;
                            minutes = 23;
                            seconds = 15;
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [siteSettings.flashSaleEnabled]);

    // Infinite Scroll Logic
    const loadMoreProducts = useCallback(() => {
        const itemsPerPage = 10;
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const newProducts = filteredProducts.slice(start, end);
        
        if (newProducts.length === 0) {
            setHasMore(false);
        } else {
            setDisplayedProducts(prev => [...prev, ...newProducts]);
            setPage(prev => prev + 1);
        }
    }, [page, filteredProducts]);

    useEffect(() => {
        setDisplayedProducts([]);
        setPage(0);
        setHasMore(true);
    }, [searchQuery, selectedPlatform]);

    useEffect(() => {
        if (page === 0 && hasMore) {
            loadMoreProducts();
        }
    }, [page, hasMore, loadMoreProducts]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreProducts();
            }
        }, { threshold: 0.1 });

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => observer.disconnect();
    }, [loadMoreProducts, hasMore]);

    // Filter products including platform filter
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.marketplace && p.marketplace.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesPlatform = selectedPlatform ? (p.platform === selectedPlatform || p.marketplace?.toLowerCase() === selectedPlatform.toLowerCase()) : true;
        
        return matchesSearch && matchesPlatform;
    });

    // FIX 1: Get affiliate products from single source of truth
    const getAffiliateProducts = useCallback((affiliateId) => {
        const productIds = affiliateProductIds[affiliateId] || [];
        return products.filter(p => productIds.includes(p.id));
    }, [products, affiliateProductIds]);

    // Custom Modal Helper
    const showModal = (title, message, type = 'success') => {
        setModal({ isOpen: true, title, message, type });
    };

    const closeModal = () => {
        setModal({ ...modal, isOpen: false });
    };

    // Animation Class Helper
    const getAnimationClass = () => {
        if (!siteSettings.animationsEnabled) return '';
        switch(siteSettings.animationType) {
            case 'fade': return 'animate-fade-in gpu-accelerated';
            case 'slide': return 'animate-slide-in gpu-accelerated';
            case 'scale': return 'animate-scale-in gpu-accelerated';
            case 'bounce': return 'animate-bounce-custom gpu-accelerated';
            default: return 'animate-fade-in gpu-accelerated';
        }
    };

    // Auth Handlers
    const handleLogin = (e) => {
        e.preventDefault();
        setAuthError('');
        
        if (loginForm.email === adminCredentials.email && loginForm.password === adminCredentials.password) {
            setIsLoggedIn(true);
            setIsAdmin(true);
            setIsAffiliate(false);
            setCurrentUser({ name: 'Administrator', email: adminCredentials.email, role: 'admin' });
            setLoginForm({ email: '', password: '' });
            showModal('Welcome Back!', 'You have successfully logged in as Administrator.', 'success');
        } else {
            const affiliate = affiliateUsers.find(u => u.email === loginForm.email && u.password === loginForm.password);
            if (affiliate && affiliate.status === 'active') {
                setIsLoggedIn(true);
                setIsAdmin(false);
                setIsAffiliate(true);
                setCurrentUser({ ...affiliate, role: 'affiliate' });
                setLoginForm({ email: '', password: '' });
                showModal('Welcome Back!', `Welcome back, ${affiliate.name}!`, 'success');
                return;
            }
            
            const user = registeredUsers.find(u => u.email === loginForm.email && u.password === loginForm.password);
            if (user) {
                setIsLoggedIn(true);
                setIsAdmin(false);
                setIsAffiliate(false);
                setCurrentUser(user);
                setLoginForm({ email: '', password: '' });
                showModal('Welcome Back!', `Welcome back, ${user.name}!`, 'success');
            } else {
                setAuthError('Invalid email or password');
                showModal('Login Failed', 'Invalid email or password. Please try again.', 'error');
            }
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setAuthError('');
        
        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            setAuthError('Please fill all fields');
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            setAuthError('Passwords do not match');
            return;
        }
        if (registerForm.password.length < 6) {
            setAuthError('Password must be at least 6 characters');
            return;
        }
        if (registeredUsers.find(u => u.email === registerForm.email) || registerForm.email === adminCredentials.email) {
            setAuthError('Email already registered');
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name: registerForm.name,
            email: registerForm.email,
            password: registerForm.password,
            role: 'user',
            joined: new Date().toISOString().split('T')[0]
        };
        
        setRegisteredUsers([...registeredUsers, newUser]);
        setAuthMode('login');
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
        showModal('Registration Successful!', 'Your account has been created. Please login to continue.', 'success');
    };

    // Affiliate Registration Handlers with Email Verification
    const handleAffiliateRegSubmit = (e) => {
        e.preventDefault();
        setAffiliateRegError('');
        
        if (!affiliateRegForm.name || !affiliateRegForm.email || !affiliateRegForm.phone) {
            setAffiliateRegError('Please fill all fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(affiliateRegForm.email)) {
            setAffiliateRegError('Please enter a valid email');
            return;
        }

        if (affiliateUsers.find(u => u.email === affiliateRegForm.email) || 
            registeredUsers.find(u => u.email === affiliateRegForm.email) ||
            affiliateRegForm.email === adminCredentials.email) {
            setAffiliateRegError('Email already registered');
            return;
        }

        // Generate verification code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        
        console.log(`Verification email sent to ${affiliateRegForm.email} with code: ${code}`);
        
        setAffiliateRegStep(2);
        
        showModal('Verification Code Sent', `A 6-digit verification code has been sent to ${affiliateRegForm.email}\n\nYour code: ${code}`, 'info');
    };

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        if (enteredCode === verificationCode) {
            setAffiliateRegStep(3);
        } else {
            setAffiliateRegError('Invalid verification code');
            showModal('Invalid Code', 'The verification code you entered is incorrect. Please try again.', 'error');
        }
    };

    const completeAffiliateRegistration = () => {
        const tempPassword = Math.random().toString(36).slice(-8);
        const newAffiliate = {
            id: Date.now(),
            ...affiliateRegForm,
            password: tempPassword,
            role: 'affiliate',
            joined: new Date().toISOString().split('T')[0],
            status: 'active',
            earnings: 0,
            clicks: 0,
            conversions: 0
        };
        
        setAffiliateUsers([...affiliateUsers, newAffiliate]);
        setCurrentUser(newAffiliate);
        setIsLoggedIn(true);
        setIsAffiliate(true);
        setShowAffiliateReg(false);
        setAffiliateRegStep(1);
        setAffiliateRegForm({ name: '', email: '', phone: '' });
        setEnteredCode('');
        
        showModal('Welcome Aboard!', `Registration successful! Your temporary password is: ${tempPassword}\n\nPlease change it after login.`, 'success');
    };

    // Admin Profile Update
    const handleAdminProfileUpdate = (e) => {
        e.preventDefault();
        setProfileUpdateMessage('');

        if (adminProfileForm.currentPassword !== adminCredentials.password) {
            setProfileUpdateMessage('Current password is incorrect');
            showModal('Error', 'Current password is incorrect', 'error');
            return;
        }

        let updates = {};
        if (adminProfileForm.newEmail && adminProfileForm.newEmail !== adminCredentials.email) {
            updates.email = adminProfileForm.newEmail;
        }
        if (adminProfileForm.newPassword) {
            if (adminProfileForm.newPassword !== adminProfileForm.confirmNewPassword) {
                setProfileUpdateMessage('New passwords do not match');
                showModal('Error', 'New passwords do not match', 'error');
                return;
            }
            if (adminProfileForm.newPassword.length < 6) {
                setProfileUpdateMessage('Password must be at least 6 characters');
                showModal('Error', 'Password must be at least 6 characters', 'error');
                return;
            }
            updates.password = adminProfileForm.newPassword;
        }

        if (Object.keys(updates).length === 0) {
            setProfileUpdateMessage('No changes made');
            return;
        }

        setAdminCredentials({ ...adminCredentials, ...updates });
        setCurrentUser({ ...currentUser, email: updates.email || currentUser.email });
        setAdminProfileForm({ currentPassword: '', newEmail: '', newPassword: '', confirmNewPassword: '' });
        setProfileUpdateMessage('Profile updated successfully!');
        showModal('Success', 'Profile updated successfully!', 'success');
    };

    // Restricted Auto-fill Logic
    const handleAutoFill = async (isAdmin = false) => {
        if (!autoFillLink) {
            showModal('Error', 'Please enter an affiliate link', 'error');
            return;
        }
        
        setAutoFillLoading(true);
        
        setTimeout(() => {
            const marketplace = detectMarketplace(autoFillLink);
            
            // Only auto-fill category and affiliate link as per requirements
            setProductForm({
                ...productForm,
                category: marketplace.category,
                affiliateLink: autoFillLink,
                platform: marketplace.name.toLowerCase(),
                marketplace: marketplace.name
            });
            
            setAutoFillLoading(false);
            showModal('Auto-fill Complete', `Category set to ${marketplace.category}. Please manually enter product title, description, and pricing.`, 'success');
        }, 1500);
    };

    // FIX 7: Handle multiple image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        // Convert to URLs (in real app, upload to server)
        const newImages = files.map(file => URL.createObjectURL(file));
        
        setProductForm(prev => ({
            ...prev,
            images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
        }));
    };

    const removeImage = (index) => {
        setProductForm(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleAffiliateProductAdd = () => {
        if (!productForm.title || !productForm.price) {
            showModal('Error', 'Please fill required fields', 'error');
            return;
        }

        const marketplace = detectMarketplace(productForm.affiliateLink);
        const newProduct = {
            id: Date.now(),
            ...productForm,
            price: parseInt(productForm.price),
            originalPrice: parseInt(productForm.originalPrice),
            discount: Math.round(((parseInt(productForm.originalPrice) - parseInt(productForm.price)) / parseInt(productForm.originalPrice)) * 100),
            sold: 0,
            rating: productForm.rating || '4.5',
            addedBy: 'affiliate',
            affiliateId: currentUser?.id,
            addedDate: new Date().toISOString().split('T')[0],
            marketplace: marketplace.name,
            platform: marketplace.name.toLowerCase(),
            // Convert single image to images array if needed
            images: productForm.images.length > 0 ? productForm.images : (productForm.image ? [productForm.image] : ['https://via.placeholder.com/400'])
        };

        // FIX 1: Update single source of truth
        setProducts(prev => [newProduct, ...prev]);
        
        // FIX 1: Track affiliate product ownership
        setAffiliateProductIds(prev => ({
            ...prev,
            [currentUser.id]: [...(prev[currentUser.id] || []), newProduct.id]
        }));

        setProductForm({ title: '', price: '', originalPrice: '', description: '', images: [], affiliateLink: '', category: '', rating: '4.5' });
        setAutoFillLink('');
        showModal('Success', 'Product added successfully!', 'success');
    };

    // CMS Product Handlers - FIX 1: Single source of truth
    const saveProduct = () => {
        if (!productForm.title || !productForm.price) {
            showModal('Error', 'Please fill required fields', 'error');
            return;
        }

        const marketplace = detectMarketplace(productForm.affiliateLink);

        if (editingProduct) {
            // FIX 1: Update in products array (single source of truth)
            setProducts(products.map(p => p.id === editingProduct.id ? {
                ...p,
                ...productForm,
                price: parseInt(productForm.price),
                originalPrice: parseInt(productForm.originalPrice),
                discount: Math.round(((parseInt(productForm.originalPrice) - parseInt(productForm.price)) / parseInt(productForm.originalPrice)) * 100),
                marketplace: marketplace.name || p.marketplace,
                platform: marketplace.name.toLowerCase() || p.platform,
                desc: productForm.description || productForm.desc,
                // Ensure images array exists
                images: productForm.images || (productForm.image ? [productForm.image] : p.images || ['https://via.placeholder.com/400'])
            } : p));
            setEditingProduct(null);
            showModal('Success', 'Product updated successfully!', 'success');
        } else {
            const newProduct = {
                id: Date.now(),
                ...productForm,
                price: parseInt(productForm.price),
                originalPrice: parseInt(productForm.originalPrice),
                discount: Math.round(((parseInt(productForm.originalPrice) - parseInt(productForm.price)) / parseInt(productForm.originalPrice)) * 100),
                sold: 0,
                rating: productForm.rating || '4.5',
                addedBy: 'admin',
                marketplace: marketplace.name,
                platform: marketplace.name.toLowerCase(),
                desc: productForm.description,
                images: productForm.images.length > 0 ? productForm.images : (productForm.image ? [productForm.image] : ['https://via.placeholder.com/400'])
            };
            setProducts([newProduct, ...products]);
            showModal('Success', 'Product added successfully!', 'success');
        }
        setProductForm({ title: '', price: '', originalPrice: '', description: '', images: [], affiliateLink: '', category: '', rating: '4.5' });
        setAutoFillLink('');
    };

    const handleBulkImport = () => {
        try {
            const data = JSON.parse(bulkImportData);
            if (!Array.isArray(data)) {
                showModal('Error', 'Invalid format: Must be an array of products', 'error');
                return;
            }

            const importedProducts = data.map((item, index) => {
                const marketplace = detectMarketplace(item.affiliateLink);
                return {
                    id: Date.now() + index,
                    title: item.title || 'Untitled',
                    price: parseInt(item.price) || 0,
                    originalPrice: parseInt(item.originalPrice) || parseInt(item.price) || 0,
                    discount: Math.round(((parseInt(item.originalPrice || item.price) - parseInt(item.price)) / parseInt(item.originalPrice || item.price)) * 100) || 0,
                    images: item.images || (item.image ? [item.image] : ['https://via.placeholder.com/400']),
                    rating: item.rating || '4.5',
                    sold: 0,
                    desc: item.description || item.desc || '',
                    affiliateLink: item.affiliateLink || '',
                    category: item.category || marketplace.category,
                    marketplace: marketplace.name,
                    platform: marketplace.name.toLowerCase(),
                    addedBy: 'admin'
                };
            });

            setProducts([...importedProducts, ...products]);
            setBulkImportData('');
            showModal('Success', `Successfully imported ${importedProducts.length} products!`, 'success');
        } catch (error) {
            showModal('Error', 'Error parsing JSON. Please check your data format.', 'error');
        }
    };

    const deleteProduct = (id) => {
        if (!isAdmin && !isAffiliate) {
            showModal('Access Denied', 'You do not have permission to delete products.', 'error');
            return;
        }
        
        // Check if affiliate owns this product
        const product = products.find(p => p.id === id);
        if (isAffiliate && product.affiliateId !== currentUser?.id) {
            showModal('Access Denied', 'You can only delete your own products.', 'error');
            return;
        }
        
        if (confirm('Are you sure you want to delete this product?')) {
            // FIX 1: Remove from single source of truth
            setProducts(products.filter(p => p.id !== id));
            
            // FIX 1: Remove from affiliate tracking if applicable
            if (product.affiliateId) {
                setAffiliateProductIds(prev => ({
                    ...prev,
                    [product.affiliateId]: (prev[product.affiliateId] || []).filter(pid => pid !== id)
                }));
            }
            
            showModal('Deleted', 'Product has been deleted successfully.', 'success');
        }
    };

    const editProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            title: product.title || '',
            price: product.price || '',
            originalPrice: product.originalPrice || '',
            description: product.desc || product.description || '',
            images: product.images || (product.image ? [product.image] : []),
            image: product.image || '',
            affiliateLink: product.affiliateLink || '',
            category: product.category || '',
            marketplace: product.marketplace || '',
            platform: product.platform || '',
            rating: product.rating || '4.5'
        });
        setAutoFillLink(product.affiliateLink || '');
    };

    // Category CRUD
    const saveCategory = () => {
        if (!categoryForm.name) return;
        
        if (editingCategory) {
            setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...categoryForm } : c));
            setEditingCategory(null);
        } else {
            setCategories([...categories, { id: Date.now(), ...categoryForm, active: true }]);
        }
        setCategoryForm({ name: '', icon: '' });
    };

    const deleteCategory = (id) => {
        if (confirm('Delete this category?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    // Banner CRUD
    const saveBanner = () => {
        if (!bannerForm.image || !bannerForm.title) return;
        
        if (editingBanner) {
            setBanners(banners.map(b => b.id === editingBanner.id ? { ...b, ...bannerForm } : b));
            setEditingBanner(null);
        } else {
            setBanners([...banners, { id: Date.now(), ...bannerForm, active: true }]);
        }
        setBannerForm({ image: '', title: '', subtitle: '' });
    };

    const deleteBanner = (id) => {
        if (confirm('Delete this banner?')) {
            setBanners(banners.filter(b => b.id !== id));
        }
    };

    // Post CRUD
    const savePost = () => {
        if (!postForm.title) return;
        
        if (editingPost) {
            setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...postForm } : p));
            setEditingPost(null);
        } else {
            setPosts([{ id: Date.now(), ...postForm, date: new Date().toISOString().split('T')[0], active: true }, ...posts]);
        }
        setPostForm({ title: '', content: '' });
    };

    const deletePost = (id) => {
        if (confirm('Delete this post?')) {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    // Order Status Update
    const updateOrderStatus = (orderId, status) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    };

    // Ad Management
    const updateAd = (id, field, value) => {
        setAdvertisements(advertisements.map(ad => ad.id === id ? { ...ad, [field]: value } : ad));
    };

    // Advertiser Contact Handler
    const handleAdvertiserSubmit = (e) => {
        e.preventDefault();
        if (!advertiserForm.name || !advertiserForm.email || !advertiserForm.message) {
            showModal('Error', 'Please fill all required fields', 'error');
            return;
        }

        const newContact = {
            id: Date.now(),
            ...advertiserForm,
            date: new Date().toISOString().split('T')[0],
            status: 'New'
        };

        setAdvertiserContacts([newContact, ...advertiserContacts]);
        setAdvertiserForm({ name: '', email: '', company: '', message: '' });
        setAdvertiserMessage('Thank you for your interest! We will contact you soon.');
        showModal('Success', 'Your inquiry has been submitted. We will contact you soon!', 'success');
        setTimeout(() => setAdvertiserMessage(''), 5000);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsAffiliate(false);
        setCurrentUser(null);
        setShowCMS(false);
        setActiveTab('home');
        setAffiliateActiveTab('home');
        // FIX 2: Reset nav stack on logout
        setNavStack([{ type: 'home' }]);
        showModal('Logged Out', 'You have been successfully logged out.', 'info');
    };

    // FIX 6: Check if user is already an affiliate
    const checkExistingAffiliate = useCallback(() => {
        if (!currentUser) return false;
        return affiliateUsers.some(u => u.email === currentUser.email);
    }, [currentUser, affiliateUsers]);

    // FIX 3: Handle exit confirmation YES - allow browser to exit
    const handleExitConfirm = () => {
        exitConfirmationShownRef.current = false;
        setShowExitConfirmation(false);
        allowExitRef.current = true;
        window.history.back();
    };

    // FIX 3: Handle exit confirmation NO - stay on site
    const handleExitCancel = () => {
        exitConfirmationShownRef.current = false;
        setShowExitConfirmation(false);
        // Push state to maintain the "trap" so next back shows confirmation again
        window.history.pushState(null, '', window.location.href);
    };

    // FIX 4: Share Functions with specific product URL
    const handleShare = (product) => {
        setShareProduct(product);
        setShowShareModal(true);
    };

    const getProductShareUrl = (product) => {
        const baseUrl = window.location.href.split('#')[0];
        return `${baseUrl}#product-${product.id}`;
    };

    const shareViaWhatsApp = () => {
        const url = getProductShareUrl(shareProduct);
        const text = `Check out this amazing product: ${shareProduct.title} - Only ${siteSettings.currency} ${shareProduct.price}!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        setShowShareModal(false);
    };

    const shareViaFacebook = () => {
        const url = getProductShareUrl(shareProduct);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        setShowShareModal(false);
    };

    const shareViaTwitter = () => {
        const url = getProductShareUrl(shareProduct);
        const text = `Check out this amazing product: ${shareProduct.title} - Only ${siteSettings.currency} ${shareProduct.price}!`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        setShowShareModal(false);
    };

    const copyLink = () => {
        const url = getProductShareUrl(shareProduct);
        navigator.clipboard.writeText(url);
        showModal('Copied!', 'Product link copied to clipboard!', 'success');
        setShowShareModal(false);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            showModal('Error', 'Your cart is empty!', 'error');
            return;
        }

        const newOrder = {
            id: 'ORD' + Date.now().toString().slice(-6),
            customer: currentUser?.name || 'Guest',
            email: currentUser?.email || 'guest@example.com',
            total: cart.reduce((sum, item) => sum + item.price, 0),
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
            items: cart.length,
            products: cart
        };

        setOrders([newOrder, ...orders]);
        setCart([]);
        localStorage.removeItem('nextordersl_cart');
        showModal('Order Placed!', `Your order ${newOrder.id} has been placed successfully. Total: ${siteSettings.currency} ${newOrder.total.toLocaleString()}`, 'success');
        setActiveTab('account');
    };

    const handleMicroJobsNotify = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        
        if (!email) {
            showModal('Error', 'Please enter your email address', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showModal('Error', 'Please enter a valid email address', 'error');
            return;
        }

        const newLead = {
            id: Date.now(),
            email: email,
            date: new Date().toISOString().split('T')[0],
            status: 'New'
        };

        setMicroJobsLeads([newLead, ...microJobsLeads]);
        e.target.reset();
        showModal('Success!', 'Thank you for your interest! We will notify you when Micro Jobs launch.', 'success');
    };

    // Stats Calculation
    const calculateStats = () => {
        const totalRevenue = orders
            .filter(o => o.status === 'Completed')
            .reduce((sum, o) => sum + o.total, 0);
        
        const totalSales = orders.filter(o => o.status === 'Completed').length;
        
        // FIX 1: Real affiliate stats calculation from single source
        const totalClicks = affiliateUsers.reduce((sum, u) => sum + (u.clicks || 0), 0);
        const totalConversions = affiliateUsers.reduce((sum, u) => sum + (u.conversions || 0), 0);
        const totalAffiliateEarnings = affiliateUsers.reduce((sum, u) => sum + (u.earnings || 0), 0);

        return {
            totalRevenue,
            totalSales,
            totalClicks,
            totalConversions,
            totalAffiliateEarnings,
            conversionRate: totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : 0
        };
    };

    const stats = calculateStats();

    // Render Affiliate Dashboard with Real Data (FIX 1)
    const renderAffiliateDashboard = () => {
        if (!isAffiliate) return null;

        // FIX 1: Get products from single source of truth
        const myProducts = getAffiliateProducts(currentUser?.id) || [];

        const affiliateStats = {
            totalProducts: myProducts.length,
            totalClicks: currentUser?.clicks || 0,
            totalEarnings: currentUser?.earnings || 0,
            conversions: currentUser?.conversions || 0
        };

        return (
            <div className="min-h-screen bg-gray-50 pb-20">
                {/* Affiliate Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Affiliate Dashboard</h1>
                            <button onClick={handleLogout} className="text-white/80 hover:text-white">
                                <Icons.Logout />
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
                                <Icons.User active={true} />
                            </div>
                            <div>
                                <h2 className="font-bold">{currentUser?.name}</h2>
                                <span className="inline-block px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-bold">AFFILIATE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Affiliate Navigation */}
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {[
                            { id: 'home', label: 'Home', icon: Icons.Home },
                            { id: 'products', label: 'Products', icon: Icons.Package },
                            { id: 'reports', label: 'Reports', icon: Icons.Chart },
                            { id: 'account', label: 'Account', icon: Icons.User }
                        ].map(tab => {
                            const Icon = tab.icon;
                            const isActive = affiliateActiveTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setAffiliateActiveTab(tab.id);
                                        // FIX 2: Push state for affiliate tab navigation
                                        pushNavState({ type: 'affiliate-tab', tab: tab.id });
                                    }}
                                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <Icon active={isActive} />
                                    <span className="text-xs font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Affiliate Tab Content */}
                    {affiliateActiveTab === 'home' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-500 text-sm">Total Products</div>
                                    <div className="text-2xl font-bold text-indigo-600">{affiliateStats.totalProducts}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-500 text-sm">Total Clicks</div>
                                    <div className="text-2xl font-bold text-blue-600">{affiliateStats.totalClicks}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-500 text-sm">Conversions</div>
                                    <div className="text-2xl font-bold text-green-600">{affiliateStats.conversions}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-500 text-sm">Earnings</div>
                                    <div className="text-2xl font-bold text-yellow-600">{siteSettings.currency} {affiliateStats.totalEarnings}</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <button onClick={() => {
                                        setAffiliateActiveTab('products');
                                        pushNavState({ type: 'affiliate-tab', tab: 'products' });
                                    }} className="bg-white text-indigo-600 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                                        + Add Product
                                    </button>
                                    <button onClick={() => {
                                        setAffiliateActiveTab('reports');
                                        pushNavState({ type: 'affiliate-tab', tab: 'reports' });
                                    }} className="bg-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/30 transition-all">
                                        View Reports
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <h3 className="font-bold mb-4">Recent Products</h3>
                                {myProducts.length === 0 ? (
                                    <p className="text-gray-400 text-center py-8">No products added yet</p>
                                ) : (
                                    <div className="space-y-3">
                                        {myProducts.slice(0, 3).map(product => (
                                            <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <img src={product.images?.[0] || product.image} className="w-12 h-12 object-cover rounded-lg" alt="" />
                                                <div className="flex-1">
                                                    <div className="font-bold text-sm">{product.title}</div>
                                                    <div className="text-xs text-gray-500">{product.sold} sold</div>
                                                </div>
                                                <div className="text-indigo-600 font-bold">{siteSettings.currency} {product.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {affiliateActiveTab === 'products' && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Auto-Fill Section with Restricted Logic */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-indigo-100">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Icons.Link /> Auto Import Product
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Paste affiliate product link here..."
                                            value={autoFillLink}
                                            onChange={(e) => setAutoFillLink(e.target.value)}
                                            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        />
                                        <button
                                            onClick={() => handleAutoFill(false)}
                                            disabled={autoFillLoading}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {autoFillLoading ? <Icons.Loader /> : 'Auto Fill'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Only Category and Affiliate Link will be auto-filled. You must manually enter Title, Description, and Pricing.</p>
                                </div>
                            </div>

                            {/* Manual Add / Edit Form - FIX 7: Multiple Images Support */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg mb-4">
                                    {editingProduct ? 'Edit Product' : 'Product Details'}
                                </h3>
                                
                                {/* FIX 7: Image Upload Section */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Max 5)</label>
                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {productForm.images.map((img, idx) => (
                                            <div key={idx} className="relative w-16 h-16">
                                                <img src={img} className="w-full h-full object-cover rounded-lg" alt="" />
                                                <button 
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                                                >×</button>
                                            </div>
                                        ))}
                                        {productForm.images.length < 5 && (
                                            <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    multiple 
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <Icons.Plus />
                                            </label>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{productForm.images.length}/5 images uploaded</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="Product Title *" 
                                        value={productForm.title}
                                        onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <select 
                                        value={productForm.category}
                                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Select Category *</option>
                                        {categories.filter(c => c.active).map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                    <input 
                                        type="number" 
                                        placeholder="Sale Price *" 
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Original Price" 
                                        value={productForm.originalPrice}
                                        onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Your Affiliate Link" 
                                        value={productForm.affiliateLink}
                                        onChange={(e) => setProductForm({...productForm, affiliateLink: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                                    />
                                </div>
                                <textarea 
                                    placeholder="Product Description" 
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4 h-24"
                                ></textarea>
                                
                                <button 
                                    onClick={handleAffiliateProductAdd}
                                    className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                                >
                                    {editingProduct ? 'Update Product' : 'Save Product'}
                                </button>
                            </div>

                            {/* FIX 1: Affiliate's Products List from single source */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b font-bold">My Products ({myProducts.length})</div>
                                {myProducts.length === 0 ? (
                                    <div className="p-8 text-center text-gray-400">
                                        No products added yet. Use auto-import or manual add above.
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {myProducts.map(product => (
                                            <div key={product.id} className="p-4 flex items-center gap-4">
                                                <img src={product.images?.[0] || product.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold">{product.title}</h4>
                                                    <p className="text-sm text-gray-500">{product.category} • {product.sold} sales</p>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="text-indigo-600 font-bold">{siteSettings.currency} {product.price}</span>
                                                        <span className="text-gray-400 line-through text-sm">{siteSettings.currency} {product.originalPrice}</span>
                                                    </div>
                                                    {product.images?.length > 1 && (
                                                        <span className="text-xs text-indigo-500 mt-1 block">{product.images.length} images</span>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => editProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                        <Icons.Edit />
                                                    </button>
                                                    <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                        <Icons.Trash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {affiliateActiveTab === 'reports' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg mb-4">Performance Report</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span>Total Clicks</span>
                                        <span className="font-bold">{affiliateStats.totalClicks}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span>Conversions</span>
                                        <span className="font-bold text-green-600">{affiliateStats.conversions}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span>Conversion Rate</span>
                                        <span className="font-bold">{affiliateStats.totalClicks > 0 ? ((affiliateStats.conversions/affiliateStats.totalClicks)*100).toFixed(1) : 0}%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                        <span>Total Earnings</span>
                                        <span className="font-bold text-indigo-600 text-lg">{siteSettings.currency} {affiliateStats.totalEarnings}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                                <h4 className="font-bold text-yellow-800 mb-2">💡 Tip</h4>
                                <p className="text-sm text-yellow-700">Share your product links on social media to increase clicks and earnings!</p>
                            </div>
                        </div>
                    )}

                    {affiliateActiveTab === 'account' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg mb-4">Affiliate Profile</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Name</span>
                                        <span className="font-bold">{currentUser?.name}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Email</span>
                                        <span className="font-bold">{currentUser?.email}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Phone</span>
                                        <span className="font-bold">{currentUser?.phone}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Joined Date</span>
                                        <span className="font-bold">{currentUser?.joined}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Affiliate ID</span>
                                        <span className="font-bold text-indigo-600">#{currentUser?.id}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button onClick={handleLogout} className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render Affiliate Registration Modal with State Check (FIX 6)
    const renderAffiliateRegistration = () => {
        if (!showAffiliateReg) return null;

        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Join Affiliate Program</h2>
                            <button onClick={() => { setShowAffiliateReg(false); setAffiliateRegStep(1); }} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex justify-between mb-8">
                            {[1, 2, 3].map(step => (
                                <div key={step} className="flex-1 flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${affiliateRegStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        {step}
                                    </div>
                                    {step < 3 && <div className={`flex-1 h-1 mx-2 ${affiliateRegStep > step ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>}
                                </div>
                            ))}
                        </div>

                        {affiliateRegStep === 1 && (
                            <form onSubmit={handleAffiliateRegSubmit} className="space-y-4">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                                        <Icons.Affiliate />
                                    </div>
                                    <p className="text-gray-600">Start earning by promoting products</p>
                                </div>
                                
                                {affiliateRegError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{affiliateRegError}</div>}
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input 
                                        type="text" 
                                        value={affiliateRegForm.name}
                                        onChange={(e) => setAffiliateRegForm({...affiliateRegForm, name: e.target.value})}
                                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input 
                                        type="email" 
                                        value={affiliateRegForm.email}
                                        onChange={(e) => setAffiliateRegForm({...affiliateRegForm, email: e.target.value})}
                                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-3 bg-gray-100 border rounded-xl text-gray-600">+94</span>
                                        <input 
                                            type="tel" 
                                            value={affiliateRegForm.phone}
                                            onChange={(e) => setAffiliateRegForm({...affiliateRegForm, phone: e.target.value})}
                                            className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            placeholder="77 123 4567"
                                        />
                                    </div>
                                </div>
                                
                                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                    Send Verification Code
                                </button>
                            </form>
                        )}

                        {affiliateRegStep === 2 && (
                            <form onSubmit={handleVerificationSubmit} className="space-y-4">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                                        <Icons.Mail />
                                    </div>
                                    <h3 className="font-bold text-lg">Verify Email</h3>
                                    <p className="text-gray-600 text-sm mt-1">Enter the 6-digit code sent to {affiliateRegForm.email}</p>
                                </div>
                                
                                {affiliateRegError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{affiliateRegError}</div>}
                                
                                <div>
                                    <input 
                                        type="text" 
                                        maxLength="6"
                                        value={enteredCode}
                                        onChange={(e) => setEnteredCode(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-center text-2xl tracking-widest verification-input"
                                        placeholder="000000"
                                    />
                                </div>
                                
                                <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                                    Verify Code
                                </button>
                                
                                <button 
                                    type="button" 
                                    onClick={() => setAffiliateRegStep(1)} 
                                    className="w-full py-3 text-gray-600 hover:text-gray-800 text-sm"
                                >
                                    Back to Registration
                                </button>
                            </form>
                        )}

                        {affiliateRegStep === 3 && (
                            <div className="text-center space-y-6 py-4">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
                                    <Icons.Check />
                                </div>
                                
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Aboard!</h3>
                                    <p className="text-gray-600">Your affiliate account has been created successfully.</p>
                                </div>
                                
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
                                    <h4 className="font-bold text-yellow-800 mb-2">Next Steps:</h4>
                                    <ul className="space-y-2 text-sm text-yellow-700">
                                        <li>✓ Access your affiliate dashboard</li>
                                        <li>✓ Import products using affiliate links</li>
                                        <li>✓ Share products and earn commissions</li>
                                    </ul>
                                </div>
                                
                                <button 
                                    onClick={completeAffiliateRegistration}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Share Modal - FIX 4 with specific product URL
    const renderShareModal = () => {
        if (!showShareModal || !shareProduct) return null;

        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl w-full max-w-sm animate-scale-in">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Share Product</h3>
                            <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                            <img src={shareProduct.images?.[0] || shareProduct.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                            <div>
                                <h4 className="font-bold text-sm line-clamp-1">{shareProduct.title}</h4>
                                <p className="text-indigo-600 font-bold">{siteSettings.currency} {shareProduct.price}</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                            <p className="text-xs text-blue-600 break-all">{getProductShareUrl(shareProduct)}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={shareViaWhatsApp} className="share-btn flex flex-col items-center gap-2 p-4 bg-green-50 text-green-600 rounded-xl hover:bg-green-100">
                                <Icons.WhatsApp />
                                <span className="text-sm font-bold">WhatsApp</span>
                            </button>
                            <button onClick={shareViaFacebook} className="share-btn flex flex-col items-center gap-2 p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100">
                                <Icons.Facebook />
                                <span className="text-sm font-bold">Facebook</span>
                            </button>
                            <button onClick={shareViaTwitter} className="share-btn flex flex-col items-center gap-2 p-4 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100">
                                <Icons.Twitter />
                                <span className="text-sm font-bold">Twitter</span>
                            </button>
                            <button onClick={copyLink} className="share-btn flex flex-col items-center gap-2 p-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200">
                                <Icons.Copy />
                                <span className="text-sm font-bold">Copy Link</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleCartProductClick = (product) => {
        const fullProduct = products.find(p => p.id === product.id);
        if (fullProduct) {
            setSelectedProduct(fullProduct);
            pushNavState({ type: 'product', id: fullProduct.id });
            setActiveTab('home');
        }
    };

    // Customer Views
    const renderHome = () => (
        <div className={getAnimationClass()}>
            {/* ADVERTISEMENTS DISPLAY SYSTEM */}
            {advertisements.find(a => a.position === 'home_top' && a.active)?.code && (
                <div className="max-w-4xl mx-auto px-4 mt-2">
                    <div 
                        className="ad-slot" 
                        dangerouslySetInnerHTML={{ __html: advertisements.find(a => a.position === 'home_top').code }} 
                    />
                    <span className="ad-label">Ad</span>
                </div>
            )}

            {/* Banner Scrolling with CSS Animation */}
            <div className={`relative w-full overflow-hidden bg-gray-200 aspect-[16/9] md:aspect-[21/9] md:rounded-2xl md:my-4 md:mx-4 md:w-[calc(100%-2rem)]`}>
                <div className="banner-track flex h-full">
                    {[...banners.filter(b => b.active), ...banners.filter(b => b.active)].map((slide, idx) => (
                        <div key={`${slide.id}-${idx}`} className="min-w-full h-full relative">
                            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                                <h2 className="text-2xl font-bold mb-1">{slide.title}</h2>
                                <p className="text-sm opacity-90">{slide.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 py-2 max-w-4xl mx-auto">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                    {categories.filter(c => c.active).map((cat) => (
                        <button key={cat.id} className="flex flex-col items-center gap-2 min-w-[70px]">
                            <div className={`w-14 h-14 ${siteSettings.primaryColor === 'indigo' ? 'bg-indigo-100 text-indigo-600' : siteSettings.primaryColor === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                                {cat.icon}
                            </div>
                            <span className="text-xs text-gray-600 font-medium">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Flash Sale with Real Countdown */}
            {siteSettings.flashSaleEnabled && (
                <div className={`bg-gradient-to-r from-rose-500 to-pink-600 text-white mx-4 max-w-4xl md:mx-auto rounded-2xl p-4 mb-6 shadow-lg`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Icons.Sparkles />
                            <h3 className="font-bold text-lg">{siteSettings.flashSaleTitle}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                            <Icons.Clock />
                            <span className="font-mono font-bold">
                                {String(flashSaleTimeLeft.hours).padStart(2, '0')}:
                                {String(flashSaleTimeLeft.minutes).padStart(2, '0')}:
                                {String(flashSaleTimeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                        {[60, 55, 50, 45].map((discount, i) => (
                            <div key={i} className="bg-white rounded-xl p-2 min-w-[100px] text-center">
                                <div className={`text-rose-500 font-bold text-lg`}>-{discount}%</div>
                                <div className="text-gray-900 font-bold">{siteSettings.currency} {(2400 - i * 200).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="px-4 pb-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="font-bold text-lg text-gray-800">
                        {searchQuery ? `Search: "${searchQuery}"` : 'Recommended For You'}
                    </h2>
                    <span className="text-gray-400 text-sm">{filteredProducts.length} items</span>
                </div>
                
                {/* Platform Category Filter */}
                <div className="mb-4 overflow-x-auto hide-scrollbar pb-2">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setSelectedPlatform(null)}
                            className={`platform-filter-btn px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${selectedPlatform === null ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            All
                        </button>
                        {[
                            { id: 'daraz', name: 'Daraz', color: 'bg-orange-500', text: 'text-white' },
                            { id: 'ebay', name: 'eBay', color: 'bg-red-500', text: 'text-white' },
                            { id: 'aliexpress', name: 'AliExpress', color: 'bg-orange-400', text: 'text-white' },
                            { id: 'amazon', name: 'Amazon', color: 'bg-yellow-500', text: 'text-gray-900' },
                            { id: 'alibaba', name: 'Alibaba', color: 'bg-orange-600', text: 'text-white' }
                        ].map((platform) => (
                            <button 
                                key={platform.id}
                                onClick={() => setSelectedPlatform(platform.id)}
                                className={`platform-filter-btn px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${selectedPlatform === platform.id ? `${platform.color} ${platform.text}` : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                {platform.name}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {displayedProducts.map((product) => (
                        <div key={product.id} onClick={() => {
                            setSelectedProduct(product);
                            pushNavState({ type: 'product', id: product.id });
                        }} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer active:scale-95 duration-200 relative group">
                            {isAdmin && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }}
                                    className="absolute top-2 left-2 z-10 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Delete product"
                                >
                                    <Icons.Trash />
                                </button>
                            )}
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                {/* FIX 7: Show first image from array */}
                                <img src={product.images?.[0] || product.image} className="w-full h-full object-cover" loading="lazy" alt={product.title} />
                                <div className={`absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full`}>-{product.discount}%</div>
                                {product.marketplace && (
                                    <div className={`absolute top-2 left-2 marketplace-badge ${detectMarketplace(product.affiliateLink).class}`}>
                                        {product.marketplace}
                                    </div>
                                )}
                                {/* FIX 7: Show image count indicator if multiple */}
                                {product.images?.length > 1 && (
                                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                        +{product.images.length - 1}
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.title}</h3>
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="text-yellow-400 text-xs">★</span>
                                    <span className="text-xs text-gray-500">{product.rating} | {product.sold} sold</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-rose-600 font-bold text-lg`}>{siteSettings.currency} {product.price.toLocaleString()}</span>
                                    <span className="text-gray-400 text-xs line-through">{siteSettings.currency} {product.originalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Infinite Scroll Loading Trigger */}
                {hasMore && (
                    <div ref={loadingRef} className="py-8 flex justify-center">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // FIX 7: Product Detail with Image Gallery
    const renderProductDetail = () => {
        const images = selectedProduct.images || (selectedProduct.image ? [selectedProduct.image] : []);
        
        return (
            <div className={getAnimationClass()}>
                <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b px-4 py-3 flex items-center gap-4">
                    <button onClick={() => {
                        window.history.back();
                    }} className="p-2 hover:bg-gray-100 rounded-full"><Icons.ArrowLeft /></button>
                    <h1 className="font-bold text-lg truncate">Product Details</h1>
                </div>
                <div className="max-w-2xl mx-auto">
                    {/* Image Gallery */}
                    <div className="image-gallery bg-gray-100">
                        <img 
                            src={images[currentImageIndex] || images[0]} 
                            className="w-full h-full object-contain" 
                            alt={selectedProduct.title} 
                        />
                        {images.length > 1 && (
                            <>
                                <button 
                                    className="gallery-nav gallery-prev" 
                                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                >‹</button>
                                <button 
                                    className="gallery-nav gallery-next" 
                                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                >›</button>
                                <div className="gallery-dots">
                                    {images.map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`gallery-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(idx)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="thumbnail-grid px-4">
                            {images.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(idx)}
                                >
                                    <img src={img} alt="" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="p-4 space-y-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="text-yellow-400">★</span>
                                <span>{selectedProduct.rating}</span>
                                <span>•</span>
                                <span>{selectedProduct.sold} sold</span>
                                {selectedProduct.marketplace && (
                                    <>
                                        <span>•</span>
                                        <span className={`marketplace-badge ${detectMarketplace(selectedProduct.affiliateLink).class}`}>
                                            {selectedProduct.marketplace}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className={`text-3xl font-bold text-rose-600`}>{siteSettings.currency} {selectedProduct.price.toLocaleString()}</span>
                            <span className="text-lg text-gray-400 line-through">{siteSettings.currency} {selectedProduct.originalPrice.toLocaleString()}</span>
                            <span className={`bg-rose-100 text-rose-600 px-2 py-1 rounded text-sm font-bold`}>-{selectedProduct.discount}%</span>
                        </div>
                        <div className="border-t border-b py-4">
                            <h3 className="font-bold mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{selectedProduct.desc}</p>
                        </div>
                        
                        <button 
                            onClick={() => handleShare(selectedProduct)}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            <Icons.Share /> Share Product
                        </button>
                        
                        <div className="space-y-3">
                            <a href={selectedProduct.affiliateLink} target="_blank" className={`block w-full py-3 bg-indigo-600 text-white text-center rounded-xl font-bold`}>Buy Now</a>
                            <button onClick={() => { 
                                setCart([...cart, {...selectedProduct, cartId: Date.now()}]); 
                                showModal('Added to Cart', `${selectedProduct.title} has been added to your cart.`, 'success');
                            }} className="block w-full py-3 bg-gray-100 text-gray-900 text-center rounded-xl font-bold">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderCart = () => (
        <div className={`${getAnimationClass()} px-4 pt-4 pb-24 max-w-4xl mx-auto min-h-screen`}>
            <h2 className="font-bold text-2xl mb-6">Shopping Cart ({cart.length})</h2>
            {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-lg">Your cart is empty</p>
                    <button onClick={() => navigateTo('home')} className={`mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full`}>Start Shopping</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.cartId} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleCartProductClick(item)}>
                            <img src={item.images?.[0] || item.image} className="w-24 h-24 object-cover rounded-lg bg-gray-100" alt={item.title} />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">{item.title}</h3>
                                <p className={`text-rose-600 font-bold mt-1`}>{siteSettings.currency} {item.price.toLocaleString()}</p>
                                <button onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCart(cart.filter(c => c.cartId !== item.cartId)); 
                                    showModal('Removed', 'Item removed from cart', 'info');
                                }} className="mt-2 text-red-500 text-sm flex items-center gap-1 hover:text-red-700"><Icons.Trash /> Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-white rounded-xl shadow-sm p-4 sticky bottom-20">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Total ({cart.length} items)</span>
                            <span className={`text-2xl font-bold text-rose-600`}>{siteSettings.currency} {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                        </div>
                        
                        <button onClick={handleCheckout} className="checkout-btn-hidden w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">Checkout</button>
                        
                        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">ℹ️</div>
                            <p className="text-blue-900 font-bold mb-1">Individual Ordering Only</p>
                            <p className="text-sm text-blue-700">
                                Products must be ordered individually.<br/>
                                Clicking 'Buy Now' will redirect you to the official store.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderAccount = () => {
        if (!isLoggedIn) {
            return (
                <div className={`${getAnimationClass()} px-4 pt-8 pb-24 max-w-md mx-auto min-h-screen`}>
                    <div className="text-center mb-8">
                        <div className={`w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <Icons.User active={true} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="text-gray-500 mt-2">{authMode === 'login' ? 'Login to access your account' : 'Register to start shopping'}</p>
                    </div>

                    {authMode === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            {authError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">{authError}</div>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`} placeholder="Enter your email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`} placeholder="Enter your password" />
                            </div>
                            <button type="submit" className={`w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors`}>Login</button>
                            <p className="text-center text-sm text-gray-600 mt-4">Don't have an account? <button type="button" onClick={() => {setAuthMode('register'); setAuthError('');}} className={`text-indigo-600 font-bold`}>Register here</button></p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4">
                            {authError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">{authError}</div>}
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={registerForm.name} onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your name" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Create password (min 6 chars)" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label><input type="password" value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Confirm your password" /></div>
                            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">Register</button>
                            <p className="text-center text-sm text-gray-600 mt-4">Already have an account? <button type="button" onClick={() => {setAuthMode('login'); setAuthError('');}} className="text-indigo-600 font-bold">Login here</button></p>
                        </form>
                    )}

                    {/* Advertise & Affiliate Section for Logged Out - FIX 5: Access Control */}
                    <div className="mt-12 space-y-4">
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                                    <Icons.Megaphone />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Advertise With Us</h3>
                                    <p className="text-sm text-gray-600">Reach thousands of customers</p>
                                </div>
                            </div>
                            <button onClick={() => navigateTo('advertise')} className="w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors">
                                Contact for Advertising
                            </button>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                    <Icons.Affiliate />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Join Affiliate Program</h3>
                                    <p className="text-sm text-gray-600">Earn commissions promoting products</p>
                                </div>
                            </div>
                            <button onClick={() => {
                                // FIX 5: Check if logged in first
                                if (!isLoggedIn) {
                                    setShowAffiliateLoginModal(true);
                                    return;
                                }
                                
                                // FIX 6: Check if already affiliate
                                if (checkExistingAffiliate()) {
                                    const existingAffiliate = affiliateUsers.find(u => u.email === currentUser.email);
                                    showModal('Already Registered', 'You are already registered as an affiliate. Redirecting to dashboard...', 'info');
                                    setTimeout(() => {
                                        setIsAffiliate(true);
                                        setCurrentUser({...existingAffiliate, role: 'affiliate'});
                                    }, 1500);
                                } else {
                                    setShowAffiliateReg(true);
                                }
                            }} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                Become an Affiliate
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (isAffiliate) {
            return renderAffiliateDashboard();
        }

        if (showCMS && isAdmin) {
            return renderCMS();
        }

        return (
            <div className={`${getAnimationClass()} px-4 pt-4 pb-24 max-w-4xl mx-auto`}>
                <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-6`}>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">👤</div>
                        <div>
                            <h2 className="text-2xl font-bold">{currentUser?.name || 'User'}</h2>
                            <p className="opacity-90">{currentUser?.email}</p>
                            {isAdmin && <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Admin Access</span>}
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <div className={`text-2xl font-bold text-indigo-600`}>{cart.length}</div>
                        <div className="text-sm text-gray-500">Cart Items</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <div className="text-2xl font-bold text-purple-600">{orders.filter(o => o.email === currentUser?.email).length}</div>
                        <div className="text-sm text-gray-500">My Orders</div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    {['My Orders', 'Saved Addresses', 'Payment Methods', 'Language', 'Help Center'].map((item, idx) => (
                        <button key={idx} className="w-full px-4 py-4 text-left border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50">
                            <span>{item}</span>
                            <Icons.ChevronRight />
                        </button>
                    ))}
                </div>

                {/* Affiliate & Advertise Visible for Logged-in Users - FIX 6: Check existing affiliate */}
                <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                                <Icons.Megaphone />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Advertise With Us</h3>
                                <p className="text-sm text-gray-600">Reach thousands of Sri Lankan customers</p>
                            </div>
                        </div>
                        <button onClick={() => navigateTo('advertise')} className="w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors">
                            Contact for Advertising
                        </button>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                <Icons.Affiliate />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Affiliate Program</h3>
                                <p className="text-sm text-gray-600">Earn commissions promoting products</p>
                            </div>
                        </div>
                        <button onClick={() => {
                            // FIX 6: Check if already affiliate
                            if (checkExistingAffiliate()) {
                                const existingAffiliate = affiliateUsers.find(u => u.email === currentUser?.email);
                                showModal('Already an Affiliate', 'You are already registered as an affiliate. Redirecting to your dashboard...', 'info');
                                setTimeout(() => {
                                    setIsAffiliate(true);
                                    setIsAdmin(false);
                                    setCurrentUser({...existingAffiliate, role: 'affiliate'});
                                }, 1500);
                            } else {
                                setShowAffiliateReg(true);
                            }
                        }} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                            {checkExistingAffiliate() ? 'Go to Affiliate Dashboard' : 'Become an Affiliate'}
                        </button>
                    </div>
                </div>

                {isAdmin && (
                    <div className="mb-6">
                        <button onClick={() => {
                            setShowCMS(true);
                            pushNavState({ type: 'cms' });
                        }} className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><Icons.Settings /></div>
                                <div className="text-left"><div className="font-bold">Admin CMS Panel</div><div className="text-sm opacity-90">Manage entire website</div></div>
                            </div>
                            <Icons.ChevronRight />
                        </button>
                    </div>
                )}
                
                <button onClick={handleLogout} className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"><Icons.Logout /> Logout</button>
            </div>
        );
    };

    // FULL CMS RENDER with Real Data and FIX 1: Single Source of Truth & FIX 7: Multiple Images
    const renderCMS = () => {
        // Real data calculations
        const cmsStats = {
            totalProducts: products.length,
            totalUsers: registeredUsers.length + 1,
            totalOrders: orders.length,
            totalRevenue: stats.totalRevenue,
            totalAffiliates: affiliateUsers.length,
            totalMicroJobsLeads: microJobsLeads.length,
            totalAds: advertisements.length
        };

        return (
            <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col md:flex-row animate-fade-in">
                {/* Mobile Sidebar Toggle */}
                <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Admin Panel</h2>
                    <button onClick={() => setCmsSidebarOpen(!cmsSidebarOpen)} className="p-2"><Icons.Menu /></button>
                </div>

                {/* Sidebar */}
                <div className={`cms-sidebar bg-white w-64 border-r flex-shrink-0 overflow-y-auto custom-scroll ${cmsSidebarOpen ? 'open' : ''}`}>
                    <div className="p-6 border-b">
                        <h1 className={`text-2xl font-bold text-indigo-600`}>{siteSettings.siteName}</h1>
                        <p className="text-xs text-gray-500 mt-1">Admin Control Panel</p>
                    </div>
                    
                    <nav className="p-4 space-y-1">
                        {[ 
                            { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
                            { id: 'products', label: 'Products', icon: Icons.Package },
                            { id: 'categories', label: 'Categories', icon: Icons.Tag },
                            { id: 'banners', label: 'Banners', icon: Icons.Image },
                            { id: 'posts', label: 'Posts/News', icon: Icons.Document },
                            { id: 'orders', label: 'Orders', icon: Icons.Cart },
                            { id: 'users', label: 'Users', icon: Icons.Users },
                            { id: 'affiliates', label: 'Affiliates', icon: Icons.Affiliate },
                            { id: 'microjobs', label: 'Micro Jobs Leads', icon: Icons.Users },
                            { id: 'ads', label: 'Advertisements', icon: Icons.Megaphone },
                            { id: 'advertisers', label: 'Ad Inquiries', icon: Icons.Mail },
                            { id: 'profile', label: 'Admin Profile', icon: Icons.Lock },
                            { id: 'settings', label: 'Site Settings', icon: Icons.Settings }
                        ].map(item => {
                            const Icon = item.icon;
                            return (
                                <button 
                                    key={item.id} 
                                    onClick={() => { setCmsActiveTab(item.id); setCmsSidebarOpen(false); setEditingProduct(null); setEditingCategory(null); setEditingBanner(null); setEditingPost(null); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${cmsActiveTab === item.id ? `bg-indigo-50 text-indigo-600 font-bold shadow-sm` : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Icon /> {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-4 mt-auto border-t">
                        <button onClick={() => {
                            setShowCMS(false);
                            window.history.back();
                        }} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Icons.ArrowLeft /> Back to Site
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto custom-scroll p-4 md:p-8">
                    {/* Dashboard with Real Data */}
                    {cmsActiveTab === 'dashboard' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-gray-500 text-sm mb-1">Total Products</div>
                                    <div className={`text-3xl font-bold text-indigo-600`}>{cmsStats.totalProducts}</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-gray-500 text-sm mb-1">Total Users</div>
                                    <div className="text-3xl font-bold text-green-600">{cmsStats.totalUsers}</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-gray-500 text-sm mb-1">Total Orders</div>
                                    <div className={`text-3xl font-bold text-rose-600`}>{cmsStats.totalOrders}</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-gray-500 text-sm mb-1">Revenue</div>
                                    <div className="text-3xl font-bold text-purple-600">{siteSettings.currency} {cmsStats.totalRevenue.toLocaleString()}</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-gray-500 text-sm mb-1">Affiliates</div>
                                    <div className="text-3xl font-bold text-blue-600">{cmsStats.totalAffiliates}</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-gray-500 text-sm mb-1">Micro Jobs Leads</div>
                                    <div className="text-3xl font-bold text-yellow-600">{cmsStats.totalMicroJobsLeads}</div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
                                    <div className="space-y-3">
                                        {orders.slice(0, 3).map(order => (
                                            <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-bold text-sm">{order.id}</div>
                                                    <div className="text-xs text-gray-500">{order.customer}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`font-bold text-indigo-600`}>{siteSettings.currency} {order.total.toLocaleString()}</div>
                                                    <div className={`text-xs ${order.status === 'Completed' ? 'text-green-600' : order.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'}`}>{order.status}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => setCmsActiveTab('products')} className={`p-4 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100`}>Add Product</button>
                                        <button onClick={() => setCmsActiveTab('banners')} className={`p-4 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-100`}>Add Banner</button>
                                        <button onClick={() => setCmsActiveTab('posts')} className="p-4 bg-green-50 text-green-600 rounded-xl font-bold text-sm hover:bg-green-100">Add Post</button>
                                        <button onClick={() => setCmsActiveTab('settings')} className="p-4 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200">Settings</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products - FIX 1: Single source, FIX 7: Multiple images */}
                    {cmsActiveTab === 'products' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-bold text-gray-800">Manage Products ({products.length})</h2>
                                <button onClick={() => { setEditingProduct(null); setProductForm({ title: '', price: '', originalPrice: '', description: '', images: [], affiliateLink: '', category: '', rating: '4.5' }); setAutoFillLink(''); }} className={`px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold flex items-center gap-2`}><Icons.Plus /> Add New</button>
                            </div>

                            {/* Bulk Import */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Icons.Upload /> Bulk Import (JSON)</h3>
                                <textarea value={bulkImportData} onChange={(e) => setBulkImportData(e.target.value)} placeholder='[{"title":"Product 1","price":1000,"originalPrice":1500,"images":["url1","url2"],"category":"Electronics","affiliateLink":"https://aliexpress.com/...","platform":"aliexpress"}]' className="w-full px-4 py-2 border rounded-lg h-32 font-mono text-sm" />
                                <div className="flex gap-2 mt-2">
                                    <button onClick={handleBulkImport} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold">Import</button>
                                    <button onClick={() => setBulkImportData('')} className="px-4 py-2 bg-gray-200 rounded-lg">Clear</button>
                                </div>
                            </div>

                            {/* Auto-fill Section - Restricted */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-100">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Icons.Link /> Auto Import from Affiliate Link
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Paste affiliate product link here..."
                                        value={autoFillLink}
                                        onChange={(e) => setAutoFillLink(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg"
                                    />
                                    <button
                                        onClick={() => handleAutoFill(true)}
                                        disabled={autoFillLoading}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {autoFillLoading ? <Icons.Loader /> : 'Auto Fill'}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Only Category and Affiliate Link will be auto-filled. You must manually enter Title, Description, and Pricing.</p>
                            </div>

                            {/* Product Form - FIX 7: Multiple images support */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-lg mb-4">{editingProduct ? 'Edit Product' : 'Product Details'}</h3>
                                
                                {/* Image Upload Section */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Max 5)</label>
                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {productForm.images.map((img, idx) => (
                                            <div key={idx} className="relative w-16 h-16">
                                                <img src={img} className="w-full h-full object-cover rounded-lg" alt="" />
                                                <button 
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                                                >×</button>
                                            </div>
                                        ))}
                                        {productForm.images.length < 5 && (
                                            <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    multiple 
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <Icons.Plus />
                                            </label>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{productForm.images.length}/5 images</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input type="text" placeholder="Title" value={productForm.title} onChange={(e) => setProductForm({...productForm, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <select value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                                        <option value="">Select Category</option>
                                        {categories.filter(c => c.active).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                    <input type="number" placeholder="Price" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <input type="number" placeholder="Original Price" value={productForm.originalPrice} onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <input type="text" placeholder="Affiliate Link" value={productForm.affiliateLink} onChange={(e) => setProductForm({...productForm, affiliateLink: e.target.value})} className="w-full px-4 py-2 border rounded-lg md:col-span-2" />
                                </div>
                                <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-4 h-24"></textarea>
                                <div className="flex gap-2">
                                    <button onClick={saveProduct} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold">{editingProduct ? 'Update' : 'Save'}</button>
                                    {editingProduct && <button onClick={() => { setEditingProduct(null); setProductForm({ title: '', price: '', originalPrice: '', description: '', images: [], affiliateLink: '', category: '', rating: '4.5' }); setAutoFillLink(''); }} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>}
                                </div>
                            </div>

                            {/* Products List - FIX 1: Single source */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="text-left p-4 font-bold">Product</th>
                                            <th className="text-left p-4 font-bold">Platform</th>
                                            <th className="text-left p-4 font-bold">Price</th>
                                            <th className="text-left p-4 font-bold">Added By</th>
                                            <th className="text-left p-4 font-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => {
                                            const marketplace = detectMarketplace(product.affiliateLink);
                                            const images = product.images || (product.image ? [product.image] : []);
                                            return (
                                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={images[0]} className="w-12 h-12 object-cover rounded-lg" alt="" />
                                                            <div>
                                                                <div className="font-bold text-sm">{product.title}</div>
                                                                <div className="text-xs text-gray-500">{product.sold} sold</div>
                                                                {images.length > 1 && (
                                                                    <div className="text-xs text-indigo-500">{images.length} images</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`marketplace-badge ${marketplace.class}`}>
                                                            {product.platform || marketplace.name}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className={`font-bold text-rose-600`}>{siteSettings.currency} {product.price.toLocaleString()}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${product.addedBy === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                                            {product.addedBy === 'admin' ? 'Admin' : 'Affiliate'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => { editProduct(product); window.scrollTo(0,0); }} className={`p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg`}><Icons.Edit /></button>
                                                            {isAdmin && (
                                                                <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Icons.Trash /></button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Categories, Banners, Posts, Orders, Users, Affiliates, MicroJobs, Profile, Ads, Advertisers, Settings - Preserved from original */}
                    {cmsActiveTab === 'categories' && (
                        <div className="space-y-6 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Manage Categories</h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex gap-4 mb-6">
                                    <input type="text" placeholder="Category Name" value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})} className={`flex-1 px-4 py-2 border rounded-lg`} />
                                    <input type="text" placeholder="Icon (emoji)" value={categoryForm.icon} onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})} className="w-24 px-4 py-2 border rounded-lg" />
                                    <button onClick={saveCategory} className={`px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold`}>{editingCategory ? 'Update' : 'Add'}</button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {categories.map(cat => (
                                        <div key={cat.id} className={`p-4 rounded-xl border-2 flex items-center justify-between ${cat.active ? `border-indigo-100 bg-indigo-50` : 'border-gray-100 bg-gray-50 opacity-50'}`}>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{cat.icon}</span>
                                                <span className="font-bold">{cat.name}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <button onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, icon: cat.icon }); }} className={`p-2 text-indigo-600 hover:bg-white rounded-lg`}><Icons.Edit /></button>
                                                <button onClick={() => deleteCategory(cat.id)} className="p-2 text-red-600 hover:bg-white rounded-lg"><Icons.Trash /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'banners' && (
                        <div className="space-y-6 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Manage Banners</h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="space-y-4 mb-6">
                                    <input type="text" placeholder="Image URL" value={bannerForm.image} onChange={(e) => setBannerForm({...bannerForm, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <input type="text" placeholder="Title" value={bannerForm.title} onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <input type="text" placeholder="Subtitle" value={bannerForm.subtitle} onChange={(e) => setBannerForm({...bannerForm, subtitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <button onClick={saveBanner} className={`w-full py-2 bg-indigo-600 text-white rounded-lg font-bold`}>{editingBanner ? 'Update Banner' : 'Add Banner'}</button>
                                </div>
                                <div className="grid gap-4">
                                    {banners.map(banner => (
                                        <div key={banner.id} className={`p-4 rounded-xl border-2 ${banner.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                                            <div className="flex gap-4">
                                                <img src={banner.image} className="w-24 h-16 object-cover rounded-lg" alt="" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold">{banner.title}</h4>
                                                    <p className="text-sm text-gray-600">{banner.subtitle}</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => { setEditingBanner(banner); setBannerForm({ image: banner.image, title: banner.title, subtitle: banner.subtitle }); }} className="p-2 text-blue-600 hover:bg-white rounded-lg"><Icons.Edit /></button>
                                                    <button onClick={() => deleteBanner(banner.id)} className="p-2 text-red-600 hover:bg-white rounded-lg"><Icons.Trash /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'posts' && (
                        <div className="space-y-6 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Manage Posts/News</h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="space-y-4 mb-6">
                                    <input type="text" placeholder="Post Title" value={postForm.title} onChange={(e) => setPostForm({...postForm, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    <textarea placeholder="Content" value={postForm.content} onChange={(e) => setPostForm({...postForm, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-24"></textarea>
                                    <button onClick={savePost} className={`w-full py-2 bg-indigo-600 text-white rounded-lg font-bold`}>{editingPost ? 'Update Post' : 'Add Post'}</button>
                                </div>
                                <div className="space-y-3">
                                    {posts.map(post => (
                                        <div key={post.id} className={`p-4 rounded-xl border ${post.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold">{post.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                                                    <span className="text-xs text-gray-400 mt-2 block">{post.date}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => { setEditingPost(post); setPostForm({ title: post.title, content: post.content }); }} className="p-2 text-blue-600 hover:bg-white rounded-lg"><Icons.Edit /></button>
                                                    <button onClick={() => deletePost(post.id)} className="p-2 text-red-600 hover:bg-white rounded-lg"><Icons.Trash /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'orders' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Manage Orders ({orders.length})</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="text-left p-4 font-bold">Order ID</th>
                                            <th className="text-left p-4 font-bold">Customer</th>
                                            <th className="text-left p-4 font-bold">Total</th>
                                            <th className="text-left p-4 font-bold">Status</th>
                                            <th className="text-left p-4 font-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4 font-bold">{order.id}</td>
                                                <td className="p-4">
                                                    <div className="font-bold">{order.customer}</div>
                                                    <div className="text-sm text-gray-500">{order.email}</div>
                                                </td>
                                                <td className="p-4 font-bold text-indigo-600">{siteSettings.currency} {order.total.toLocaleString()}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <select 
                                                        value={order.status} 
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                        className="px-3 py-1 border rounded-lg text-sm"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'users' && (
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Registered Users ({registeredUsers.length})</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                                {registeredUsers.length === 0 ? (
                                    <div className="p-12 text-center text-gray-400">No users registered yet</div>
                                ) : (
                                    <div className="divide-y">
                                        {registeredUsers.map(user => (
                                            <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">👤</div>
                                                    <div>
                                                        <div className="font-bold">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email} • Joined {user.joined}</div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">User</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'affiliates' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Manage Affiliates ({affiliateUsers.length})</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="text-left p-4 font-bold">Affiliate</th>
                                            <th className="text-left p-4 font-bold">Clicks</th>
                                            <th className="text-left p-4 font-bold">Conversions</th>
                                            <th className="text-left p-4 font-bold">Earnings</th>
                                            <th className="text-left p-4 font-bold">Joined</th>
                                            <th className="text-left p-4 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {affiliateUsers.map(affiliate => (
                                            <tr key={affiliate.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4">
                                                    <div className="font-bold">{affiliate.name}</div>
                                                    <div className="text-sm text-gray-500">{affiliate.email}</div>
                                                </td>
                                                <td className="p-4 font-bold text-blue-600">{affiliate.clicks || 0}</td>
                                                <td className="p-4 font-bold text-green-600">{affiliate.conversions || 0}</td>
                                                <td className="p-4 font-bold text-indigo-600">{siteSettings.currency} {affiliate.earnings || 0}</td>
                                                <td className="p-4 text-sm text-gray-500">{affiliate.joined}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${affiliate.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {affiliate.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'microjobs' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Micro Jobs Leads ({microJobsLeads.length})</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {microJobsLeads.length === 0 ? (
                                    <div className="p-12 text-center text-gray-400">
                                        <div className="text-4xl mb-4">📧</div>
                                        <p>No leads captured yet.</p>
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="text-left p-4 font-bold">Email</th>
                                                <th className="text-left p-4 font-bold">Date Captured</th>
                                                <th className="text-left p-4 font-bold">Status</th>
                                                <th className="text-left p-4 font-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {microJobsLeads.map((lead, idx) => (
                                                <tr key={lead.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-4 font-bold text-indigo-600">{lead.email}</td>
                                                    <td className="p-4 text-sm text-gray-600">{lead.date}</td>
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'New' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                            {lead.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <button 
                                                            onClick={() => {
                                                                const updated = microJobsLeads.map((l, i) => i === idx ? {...l, status: 'Contacted'} : l);
                                                                setMicroJobsLeads(updated);
                                                            }}
                                                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-200"
                                                        >
                                                            Mark Contacted
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'profile' && (
                        <div className="space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Admin Profile Settings</h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                                <div className="flex items-center gap-4 pb-4 border-b">
                                    <div className={`w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl`}>👤</div>
                                    <div>
                                        <h3 className="font-bold text-lg">{currentUser?.name}</h3>
                                        <p className="text-gray-500 text-sm">{currentUser?.email}</p>
                                        <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">Administrator</span>
                                    </div>
                                </div>

                                {profileUpdateMessage && (
                                    <div className={`p-4 rounded-lg ${profileUpdateMessage.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                                        {profileUpdateMessage}
                                    </div>
                                )}

                                <form onSubmit={handleAdminProfileUpdate} className="space-y-4">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><Icons.Key /> Security Verification</h4>
                                        <input 
                                            type="password" 
                                            placeholder="Current Password" 
                                            value={adminProfileForm.currentPassword}
                                            onChange={(e) => setAdminProfileForm({...adminProfileForm, currentPassword: e.target.value})}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-4 pt-4 border-t">
                                        <h4 className="font-bold text-gray-700">Update Credentials</h4>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Email (leave blank to keep current)</label>
                                            <input 
                                                type="email"
                                                value={adminProfileForm.newEmail}
                                                onChange={(e) => setAdminProfileForm({...adminProfileForm, newEmail: e.target.value})}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                                            <input 
                                                type="password"
                                                value={adminProfileForm.newPassword}
                                                onChange={(e) => setAdminProfileForm({...adminProfileForm, newPassword: e.target.value})}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                            <input 
                                                type="password"
                                                value={adminProfileForm.confirmNewPassword}
                                                onChange={(e) => setAdminProfileForm({...adminProfileForm, confirmNewPassword: e.target.value})}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500`}
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className={`w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700`}>
                                        Update Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'ads' && (
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Advertisement Manager</h2>
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                                <h4 className="font-bold text-blue-900 mb-2">Google AdSense Integration</h4>
                                <p className="text-sm text-blue-700">Paste your ad code below. Ads will appear according to their positions.</p>
                            </div>
                            <div className="space-y-6">
                                {advertisements.map((ad) => (
                                    <div key={ad.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h3 className="font-bold">{ad.name}</h3>
                                                <span className="text-xs text-gray-500 uppercase">{ad.position}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">{ad.active ? 'Active' : 'Inactive'}</span>
                                                <button 
                                                    onClick={() => updateAd(ad.id, 'active', !ad.active)}
                                                    className={`w-12 h-6 rounded-full transition-colors relative ${ad.active ? 'bg-green-500' : 'bg-gray-300'}`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${ad.active ? 'left-7' : 'left-1'}`}></div>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea
                                            value={ad.code}
                                            onChange={(e) => updateAd(ad.id, 'code', e.target.value)}
                                            placeholder="<!-- Paste your ad code here -->"
                                            className="w-full px-4 py-2 border rounded-lg h-32 font-mono text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {cmsActiveTab === 'advertisers' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Advertiser Inquiries ({advertiserContacts.length})</h2>
                            {advertiserContacts.length === 0 ? (
                                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center text-gray-400">
                                    <Icons.Mail />
                                    <p className="mt-4">No inquiries yet</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {advertiserContacts.map((contact) => (
                                        <div key={contact.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl">
                                                        <Icons.Megaphone />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg">{contact.name}</h3>
                                                        <p className="text-sm text-gray-500">{contact.company || 'No Company'} • {contact.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${contact.status === 'New' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                        {contact.status}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{contact.date}</span>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-700">{contact.message}</p>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <button className={`px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold`}>Reply</button>
                                                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold">Mark as Contacted</button>
                                                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-bold ml-auto">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {cmsActiveTab === 'settings' && (
                        <div className="space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800">Site Settings</h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                                <div className="space-y-4 pb-6 border-b">
                                    <h3 className="font-bold text-lg flex items-center gap-2"><Icons.Palette /> Theme Colors</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {['indigo', 'blue', 'purple', 'pink', 'rose', 'orange', 'green', 'teal'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSiteSettings({...siteSettings, primaryColor: color})}
                                                    className={`w-10 h-10 rounded-full bg-${color}-500 border-4 transition-all ${siteSettings.primaryColor === color ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {['rose', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSiteSettings({...siteSettings, secondaryColor: color})}
                                                    className={`w-10 h-10 rounded-full bg-${color}-500 border-4 transition-all ${siteSettings.secondaryColor === color ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pb-6 border-b">
                                    <h3 className="font-bold text-lg flex items-center gap-2"><Icons.Play /> Animations</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">Enable Animations</span>
                                        <button 
                                            onClick={() => setSiteSettings({...siteSettings, animationsEnabled: !siteSettings.animationsEnabled})}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${siteSettings.animationsEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${siteSettings.animationsEnabled ? 'left-7' : 'left-1'}`}></div>
                                        </button>
                                    </div>
                                    {siteSettings.animationsEnabled && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Animation Style</label>
                                            <select 
                                                value={siteSettings.animationType} 
                                                onChange={(e) => setSiteSettings({...siteSettings, animationType: e.target.value})}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            >
                                                <option value="fade">Fade In</option>
                                                <option value="slide">Slide In</option>
                                                <option value="scale">Scale In</option>
                                                <option value="bounce">Bounce</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                                    <input type="text" value={siteSettings.siteName} onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
                                    <input type="text" value={siteSettings.currency} onChange={(e) => setSiteSettings({...siteSettings, currency: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <span className="font-bold text-gray-700">Enable Flash Sale</span>
                                    <button onClick={() => setSiteSettings({...siteSettings, flashSaleEnabled: !siteSettings.flashSaleEnabled})} className={`w-12 h-6 rounded-full transition-colors relative ${siteSettings.flashSaleEnabled ? `bg-indigo-600` : 'bg-gray-300'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${siteSettings.flashSaleEnabled ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                                <button onClick={() => showModal('Success', 'Settings saved successfully!', 'success')} className={`w-full py-3 bg-indigo-600 text-white rounded-lg font-bold`}>Save Settings</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderMicroJobs = () => (
        <div className="micro-jobs-container animate-fade-in">
            <div className="micro-jobs-card">
                <div className="icon-container"><div className="pulse-ring"></div><svg className="w-16 h-16 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                <h1 className="micro-jobs-title">Micro Jobs feature is coming soon!</h1>
                <p className="micro-jobs-subtitle">Safe & Trusted tasks for everyone</p>
                <p className="micro-jobs-desc">We are currently preparing a secure platform where you can earn money by completing simple, verified tasks.</p>
                <div className="workflow">
                    <div className="workflow-step"><div className="step-number">1</div><div className="step-title">Browse Tasks</div><div className="step-desc">Explore available micro-jobs.</div></div>
                    <div className="workflow-step"><div className="step-number">2</div><div className="step-title">Complete Work</div><div className="step-desc">Finish simple tasks.</div></div>
                    <div className="workflow-step"><div className="step-number">3</div><div className="step-title">Get Paid</div><div className="step-desc">Receive secure payments.</div></div>
                </div>
                <div className="notify-section">
                    <form className="form-group" onSubmit={handleMicroJobsNotify}>
                        <label className="form-label">Get notified when we launch</label>
                        <input name="email" type="email" placeholder="Enter your email" className="notify-input" required />
                        <button type="submit" className="btn-notify">Get Notified</button>
                    </form>
                </div>
            </div>
        </div>
    );

    const renderMessages = () => (
        <div className={`${getAnimationClass()} px-4 pt-4 pb-24 max-w-4xl mx-auto min-h-screen`}>
            <h2 className="font-bold text-2xl mb-6">Messages</h2>
            <div className="space-y-4">
                {posts.filter(p => p.active).map((post) => (
                    <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
                        <div className={`w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl`}>📢</div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1"><h3 className="font-bold">{post.title}</h3><span className="text-xs text-gray-400">{post.date}</span></div>
                            <p className="text-sm text-gray-600">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAdvertiserPage = () => (
        <div className={`${getAnimationClass()} px-4 pt-8 pb-24 max-w-2xl mx-auto min-h-screen`}>
            <button onClick={() => navigateTo('account')} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Icons.ArrowLeft /> Back
            </button>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📢</div>
                <h2 className="text-3xl font-bold text-gray-900">Advertise With Us</h2>
                <p className="text-gray-500 mt-2">Reach thousands of potential customers</p>
            </div>

            {advertiserMessage && (
                <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl border border-green-200 text-center">
                    {advertiserMessage}
                </div>
            )}

            <form onSubmit={handleAdvertiserSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input 
                        type="text" 
                        value={advertiserForm.name}
                        onChange={(e) => setAdvertiserForm({...advertiserForm, name: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500`}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input 
                        type="email" 
                        value={advertiserForm.email}
                        onChange={(e) => setAdvertiserForm({...advertiserForm, email: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500`}
                        placeholder="john@company.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input 
                        type="text" 
                        value={advertiserForm.company}
                        onChange={(e) => setAdvertiserForm({...advertiserForm, company: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Your Company Ltd"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message/Proposal *</label>
                    <textarea 
                        value={advertiserForm.message}
                        onChange={(e) => setAdvertiserForm({...advertiserForm, message: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 h-32`}
                        placeholder="Tell us about your advertising needs..."
                        required
                    ></textarea>
                </div>
                <button type="submit" className={`w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors`}>
                    Send Inquiry
                </button>
            </form>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-yellow-600">50K+</div>
                    <div className="text-xs text-gray-500">Monthly Visitors</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-yellow-600">5%</div>
                    <div className="text-xs text-gray-500">Conversion Rate</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-yellow-600">24h</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                </div>
            </div>
        </div>
    );

    const renderHeader = () => (
        <header className="sticky top-0 z-50 glass-effect shadow-sm px-4 py-3">
            <div className="max-w-4xl mx-auto relative flex items-center justify-center">
                <div className={`absolute left-0 font-bold text-xl text-indigo-600 md:hidden`}>{siteSettings.siteName}</div>
                <div className="relative w-full max-w-md">
                    <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); setPage(0); setDisplayedProducts([]);}} className={`w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Icons.Search /></div>
                    {searchQuery && <button onClick={() => {setSearchQuery(''); setPage(0); setDisplayedProducts([]);}} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>}
                </div>
            </div>
        </header>
    );

    const renderBottomNav = () => (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 pb-safe">
            <div className="max-w-4xl mx-auto flex justify-around items-center">
                {[ 
                    { id: 'home', label: 'Home', icon: Icons.Home },
                    { id: 'messages', label: 'News', icon: Icons.Message },
                    { id: 'cart', label: 'Cart', icon: Icons.Cart, badge: cart.length },
                    { id: 'jobs', label: 'Jobs', icon: Icons.Work },
                    { id: 'account', label: 'Acc', icon: Icons.User }
                ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => navigateTo(tab.id)} className="flex flex-col items-center gap-1 p-2 rounded-xl active:bg-gray-50 transition-colors min-w-[64px] relative">
                            <div className="relative">
                                <Icon active={isActive} />
                                {tab.badge > 0 && (
                                    <span className={`absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center`}>
                                        {tab.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] font-medium ${isActive ? `text-indigo-600` : 'text-gray-400'}`}>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {!selectedProduct && activeTab !== 'jobs' && activeTab !== 'advertise' && !showCMS && !isAffiliate && renderHeader()}
            
            <main className="max-w-4xl mx-auto">
                {isAffiliate ? renderAffiliateDashboard() :
                 selectedProduct ? renderProductDetail() : 
                 activeTab === 'home' ? renderHome() :
                 activeTab === 'cart' ? renderCart() :
                 activeTab === 'messages' ? renderMessages() :
                 activeTab === 'jobs' ? renderMicroJobs() :
                 activeTab === 'advertise' ? renderAdvertiserPage() :
                 activeTab === 'account' ? renderAccount() : null}
            </main>
            
            {!selectedProduct && !showCMS && !isAffiliate && activeTab !== 'advertise' && renderBottomNav()}
            {renderAffiliateRegistration()}
            {renderShareModal()}
            
            {/* FIX 5: Affiliate Login Required Modal */}
            <AffiliateLoginModal 
                isOpen={showAffiliateLoginModal}
                onClose={() => setShowAffiliateLoginModal(false)}
                onLoginClick={() => {
                    setActiveTab('account');
                    setAuthMode('login');
                }}
            />
            
            {/* Custom Modal Overlay */}
            <CustomModal 
                isOpen={modal.isOpen} 
                onClose={closeModal} 
                title={modal.title} 
                message={modal.message} 
                type={modal.type} 
            />

            {/* FIX 3: Exit Confirmation Modal - Updated with proper handlers using refs */}
            <ExitConfirmationModal 
                isOpen={showExitConfirmation}
                onConfirm={handleExitConfirm}
                onCancel={handleExitCancel}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);