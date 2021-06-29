import { IService } from '~/type';
import { FunctionComponent } from 'react';

const ServiceCard: FunctionComponent<{ service: IService }> = ({
  service: { Icon, about, title },
}) => {
  const createMarkUp = () => {
    return {
      __html: about,
    };
  };

  return (
    <div className="flex items-center p-2 space-x-4 dark:bg-gray-900 transition ease-in-out duration-700">
      <Icon className="w-12 h-12 text-blue-twitter dark:text-blue-twitter ml-2" />
      <div className="flex flex-col space-y-1">
        <h1 className="font-bold text-base text-gray-700 dark:text-gray-200">
          {title}
        </h1>
        <p
          className="text-sm text-gray-600 dark:text-gray-300"
          dangerouslySetInnerHTML={createMarkUp()}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
