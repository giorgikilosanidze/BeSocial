import { useContext } from 'react';
import { ChatUiContext } from './chatUiStore';

export const useChatUi = () => {
	const context = useContext(ChatUiContext);

	if (!context) {
		throw new Error('useChatUi must be used inside ChatUiProvider');
	}

	return context;
};
