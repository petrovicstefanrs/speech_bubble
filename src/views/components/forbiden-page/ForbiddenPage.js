import React from 'react';
import {Link} from 'react-router-dom';

import Separator from '../separator';
import TextBlock from '../text-block';

import * as routes from '../../../app/routes';

import './ForbiddenPage.css';

const CLASS = 'sb-ForbiddenPage';

const ForbiddenPage = () => (
	<React.Fragment>
		<Separator />
		<div className={CLASS + '-bottom ' + CLASS + '-section'}>
			<TextBlock>
				You <span>don't have access</span> to this page
				<br />
				Click <Link to={routes.HOME}>here</Link> to go Home
			</TextBlock>
		</div>
		<Separator />
	</React.Fragment>
);

export default ForbiddenPage;
