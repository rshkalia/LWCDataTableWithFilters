import { LightningElement,api } from 'lwc';

export default class CustomRichText extends LightningElement {

    @api fieldValue =" ";
    @api fieldLabel;

    allowedFormats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color',
        'background',
        'code',
        'code-block',
        'script',
        'blockquote',
        'direction',
    ];

    handleChange(event) {
        this.fieldValue = event.target.value;
       }
}