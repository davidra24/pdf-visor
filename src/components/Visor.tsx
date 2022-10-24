import React, { LegacyRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';
import './visor.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const samplePDF = require('../pdf/sample.pdf');

export const Visor = () => {
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [loading, setLoading] = useState(false);

	const { width, height, ref } = useResizeDetector();
	const Page = React.forwardRef(
		({ pageNumber }: { pageNumber: number }, ref: LegacyRef<HTMLDivElement>) => {
			return (
				<div ref={ref}>
					<ReactPdfPage pageNumber={pageNumber} height={height} />
				</div>
			);
		}
	);

	useEffect(() => {
		setLoading(true);
		pdfjs.getDocument(samplePDF).promise.then((doc: any) => {
			setNumberOfPages(doc.numPages);
			setLoading(false);
		});
	}, []);

	return loading ? (
		<div>Cargando</div>
	) : (
		/** @ts-ignore */
		<div className='container' ref={ref}>
			<Document
				file={samplePDF}
				onLoadSuccess={(props: any) => {
					console.log(props);
				}}>
				{/** @ts-ignore */}
				<HTMLFlipBook width={width / 2} height={height} autoSize>
					{/** @ts-ignore */}
					{Array.from({ length: numberOfPages }, (v, k) => k + 1).map((index) => {
						return <Page key={index} pageNumber={index} ref={ref} />;
					})}
				</HTMLFlipBook>
			</Document>
		</div>
	);
};
