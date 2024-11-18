import { Context, createContext, useContext, useEffect, useState } from 'react'
import { fetchNui } from '../utils/fetchNui'
import { MRT_Localization } from 'mantine-react-table'
import { useTranslation } from 'react-i18next'

interface LocaleContextValue {
	localization: MRT_Localization | undefined
}

const LocaleCtx = createContext<LocaleContextValue | null>(null)

const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { i18n } = useTranslation()
    const [localization, setLocalization] = useState<MRT_Localization | undefined>(undefined)

	useEffect(() => {
		const uiReady = async () => {
			const { locale } = await fetchNui('uiReady', {}, {data: { locale: 'pt' }})

			let resource = null

			if (locale === 'pt') {
				const { MRT_Localization_PT } = await import("mantine-react-table/locales/pt")
				setLocalization(MRT_Localization_PT)
				resource = await import("../locales/pt.json")
			} else {
				const { MRT_Localization_EN } = await import("mantine-react-table/locales/en")
				setLocalization(MRT_Localization_EN)
				resource = await import("../locales/en.json")
			}

			i18n.addResourceBundle(locale, 'translation', resource.default.translation);
			i18n.changeLanguage(locale)
		}
		uiReady()
	}, [])

	return <LocaleCtx.Provider value={{ localization }}>{children}</LocaleCtx.Provider>
}

export default LocalizationProvider

export const useLocalization = () => useContext<LocaleContextValue>(LocaleCtx as Context<LocaleContextValue>)