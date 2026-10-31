import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1.5 text-sm font-medium text-slate-200">{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceApiKey}
            initialValue={defaultValue}
            init={{
              height: 480,
              menubar: true,
              branding: false,
              plugins: ['image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'],
              toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | help',
              content_style: 'body { font-family: "DM Sans", Helvetica, Arial, sans-serif; font-size:15px }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}
