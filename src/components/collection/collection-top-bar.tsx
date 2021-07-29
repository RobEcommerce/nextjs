import { Drawer } from "@components/common/drawer/drawer";
import { MdCollectionsBookmark } from "react-icons/md";
import Text from "@components/ui/text";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import CollectionFilterSidebar from "./collection-filter-sidebar";

const CollectionTopBar = () => {
	const { openFilter, displayFilter, closeFilter } = useUI();
	const { t } = useTranslation("common");
	const {
		locale,
		query: { slug },
	} = useRouter();

	const collectionTitle = slug?.toString().split("-").join(" ");
	const dir = getDirection(locale);
	const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
	return (
		<div className="flex justify-between items-center mb-7">
			<Text
				variant="pageHeading"
				className="hidden lg:inline-flex pb-1 capitalize"
			>
				{collectionTitle}
			</Text>
			<button
				className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
				onClick={openFilter}
			>
				<MdCollectionsBookmark className="text-lg" />
				<span className="ps-2">{t("text-filters")}</span>
			</button>
			<div className="flex items-center justify-end">
				<div className="flex-shrink-0 text-body text-xs md:text-sm leading-4">
					9,608 {t("text-items")}
				</div>
			</div>
			<Drawer
				placement={dir === "rtl" ? "right" : "left"}
				open={displayFilter}
				onClose={closeFilter}
				handler={false}
				showMask={true}
				level={null}
				contentWrapperStyle={contentWrapperCSS}
			>
				<CollectionFilterSidebar />
			</Drawer>
		</div>
	);
};

export default CollectionTopBar;
