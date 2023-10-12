import { Button, useTranslate } from 'react-admin';

const tButton = ({ doSave }) => {
    const translate = useTranslate(); // returns the i18nProvider.translate() method
    return (
        <Button onClick={doSave}>
            {translate('ra.action.save')}
        </Button>
    );
};

export default tButton;
